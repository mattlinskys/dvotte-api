import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { utils } from 'ethers';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { NonceTokenPayload, AccessTokenPayload } from 'auth/auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  get nonceJwtSecret() {
    return this.configService.get('auth.nonceJwtSecret');
  }

  get accessJwtSecret() {
    return this.configService.get('auth.accessJwtSecret');
  }

  signNonceTokenForAddress(address: string) {
    const payload: NonceTokenPayload = {
      address,
      nonce: this.getNonce(),
    };

    return this.jwtService.signAsync(payload, {
      secret: this.nonceJwtSecret,
      expiresIn: '30m',
    });
  }

  async verifyNonceTokenSignature(token: string, signature: string) {
    const { address, nonce } =
      await this.jwtService.verifyAsync<NonceTokenPayload>(token, {
        secret: this.nonceJwtSecret,
      });

    return {
      isValid: utils.verifyMessage(nonce, signature) === address,
      payload: { address, nonce },
    };
  }

  signAuthTokenForAddress(address: string) {
    const payload: AccessTokenPayload = {
      address,
    };
    return this.jwtService.signAsync(payload, {
      secret: this.accessJwtSecret,
      expiresIn: '7d',
    });
  }

  getNonce(size = 16) {
    return randomBytes(size).toString('hex');
  }
}

import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { AuthService } from 'auth/auth.service';
import { plainToInstance } from 'class-transformer';
import {
  GenerateNonceDto,
  GenerateNonceResponse,
} from 'auth/dto/generate-nonce.dto';
import {
  VerifySignatureDto,
  VerifySignatureResponse,
} from 'auth/dto/verify-signature.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('nonce')
  @ApiOkResponse({ type: GenerateNonceResponse })
  @HttpCode(200)
  async generateNonce(@Body() generateNonceDto: GenerateNonceDto) {
    return plainToInstance(GenerateNonceResponse, {
      nonceToken: await this.authService.signNonceTokenForAddress(
        generateNonceDto.address,
      ),
    });
  }

  @Post('signature')
  @ApiOkResponse({ type: VerifySignatureResponse })
  @HttpCode(200)
  async verifySignature(@Body() verifySignarureDto: VerifySignatureDto) {
    const {
      isValid,
      payload: { address },
    } = await this.authService.verifyNonceTokenSignature(
      verifySignarureDto.nonceToken,
      verifySignarureDto.signature,
    );
    if (!isValid) {
      throw new ForbiddenException();
    }

    return plainToInstance(VerifySignatureResponse, {
      accessToken: await this.authService.signAuthTokenForAddress(address),
    });
  }
}

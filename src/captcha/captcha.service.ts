import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CaptchaService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async hCaptchaVerify(token: string) {
    const {
      data: { success },
    } = await firstValueFrom(
      this.httpService.post<{ success: boolean }>(
        'https://hcaptcha.com/siteverify',
        new URLSearchParams({
          response: token,
          sitekey: this.configService.get('captcha.hCaptchaSitekey'),
          secret: this.configService.get('captcha.hCaptchaSecret'),
        }),
      ),
    );
    return success;
  }
}

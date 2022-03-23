import { Injectable, NestMiddleware } from '@nestjs/common';
import { CaptchaService } from 'captcha/captcha.service';
import { TooManyRequestsException } from 'exceptions/tooManyRequests.exception';
import type { Request, NextFunction } from 'express';

@Injectable()
export class CaptchaMiddleware implements NestMiddleware {
  constructor(private readonly captchaService: CaptchaService) {}

  async use(req: Request, _, next: NextFunction) {
    const {
      headers: { 'captcha-token': token },
    } = req;
    if (
      typeof token !== 'string' ||
      !(await this.captchaService.hCaptchaVerify(token))
    ) {
      throw new TooManyRequestsException({ reason: 'captcha' });
    }

    next();
  }
}

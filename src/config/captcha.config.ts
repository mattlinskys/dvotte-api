import { registerAs } from '@nestjs/config';

export default registerAs('captcha', () => ({
  hCaptchaSitekey: process.env.HCAPTCHA_SITEKEY,
  hCaptchaSecret: process.env.HCAPTCHA_SECRET,
}));

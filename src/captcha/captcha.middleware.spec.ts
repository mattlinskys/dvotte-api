import { CaptchaMiddleware } from './captcha.middleware';

describe('CaptchaMiddleware', () => {
  it('should be defined', () => {
    expect(new CaptchaMiddleware()).toBeDefined();
  });
});

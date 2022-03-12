import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
}));

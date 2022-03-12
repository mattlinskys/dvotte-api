import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  accessJwtSecret: process.env.ACCESS_JWT_SECRET,
  nonceJwtSecret: process.env.NONCE_JWT_SECRET,
}));

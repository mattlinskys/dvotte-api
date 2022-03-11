import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
  dbName: process.env.MONGO_DB_NAME,
  url: process.env.MONGO_URL,
}));

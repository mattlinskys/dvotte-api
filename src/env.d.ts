import { AccessTokenPayload } from 'auth/auth.types';

declare module 'express' {
  interface Request {
    accessPayload?: AccessTokenPayload;
  }
}

export {};

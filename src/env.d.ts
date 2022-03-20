import type { AccessTokenPayload } from 'auth/auth.types';
import type { Project } from 'projects/entities/project.entity';

declare module 'express' {
  interface Request {
    accessPayload?: AccessTokenPayload;
    project?: Project;
  }
}

export {};

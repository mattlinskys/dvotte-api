import { plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @IsNumber()
  PORT = 5500;

  @IsString()
  MONGO_DB_NAME: string;

  @IsString()
  MONGO_URL: string;

  @IsString()
  REDIS_HOST: string;

  @IsString()
  REDIS_PORT: string;

  @IsString()
  @IsOptional()
  REDIS_PASSWORD: string;

  @IsString()
  ACCESS_JWT_SECRET: string;

  @IsString()
  NONCE_JWT_SECRET: string;

  @IsString()
  AWS_ACCESS_KEY: string;

  @IsString()
  AWS_SECRET_ACCESS_KEY: string;

  @IsString()
  AWS_STATIC_FILES_BUCKET: string;

  @IsString()
  MAX_PROJECTS_PER_ADDRESS: string;

  @IsString()
  HCAPTCHA_SITEKEY: string;

  @IsString()
  HCAPTCHA_SECRET: string;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};

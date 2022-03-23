import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectsModule } from 'projects/projects.module';
import { validate } from 'env.validation';
import { AuthModule } from 'auth/auth.module';
import { S3ManagerModule } from 's3-manager/s3-manager.module';
import { BullModule } from '@nestjs/bull';
import { CleanerConsumer } from 'cleaner/cleaner.consumer';
import { CaptchaModule } from './captcha/captcha.module';
import { RpcProviderModule } from './rpc-provider/rpc-provider.module';

import mongoConfig from 'config/mongo.config';
import redisConfig from 'config/redis.config';
import authConfig from 'config/auth.config';
import awsConfig from 'config/aws.config';
import appConfig from 'config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mongoConfig, redisConfig, authConfig, awsConfig, appConfig],
      validate,
      isGlobal: true,
    }),
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useFactory: (configService: ConfigService) => ({
          credentials: {
            accessKeyId: configService.get('aws.accessKey'),
            secretAccessKey: configService.get('aws.secretAccessKey'),
          },
        }),
        inject: [ConfigService],
        imports: [ConfigModule],
      },
      services: [S3],
    }),
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
          password: configService.get('redis.password'),
        },
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    MikroOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        entities: ['./dist/projects/entities'],
        type: 'mongo',
        dbName: configService.get('mongo.dbName'),
        clientUrl: configService.get('mongo.url'),
        ensureIndexes: true,
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    ProjectsModule,
    AuthModule,
    S3ManagerModule,
    CaptchaModule,
    RpcProviderModule,
  ],
  providers: [CleanerConsumer],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}

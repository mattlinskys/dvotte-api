import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectsModule } from 'projects/projects.module';
import { validate } from 'env.validation';
import { AuthModule } from 'auth/auth.module';

import mongoConfig from 'config/mongo.config';
import redisConfig from 'config/redis.config';
import authConfig from 'config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mongoConfig, redisConfig, authConfig],
      validate,
      isGlobal: true,
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
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}

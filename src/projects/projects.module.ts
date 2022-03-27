import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProjectsService } from 'projects/projects.service';
import { ProjectsController } from 'projects/projects.controller';
import { MulterModule } from '@nestjs/platform-express';
import tempDir from 'temp-dir';
import { JwtModule } from '@nestjs/jwt';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Project } from 'projects/entities/project.entity';
import { ProjectMiddleware } from 'projects/middleware/project.middleware';
import { S3ManagerModule } from 's3-manager/s3-manager.module';
import { BullModule } from '@nestjs/bull';
import { CLEANER_QUEUE_NAME } from 'cleaner/cleaner.constants';
import { CaptchaMiddleware } from 'captcha/captcha.middleware';
import { CaptchaModule } from 'captcha/captcha.module';
import { RpcProviderModule } from 'rpc-provider/rpc-provider.module';
import { DevotesModule } from 'devotes/devotes.module';

@Module({
  imports: [
    JwtModule.register({}),
    MulterModule.register({
      dest: tempDir,
      preservePath: true,
    }),
    BullModule.registerQueue({
      name: CLEANER_QUEUE_NAME,
    }),
    MikroOrmModule.forFeature([Project]),
    S3ManagerModule,
    CaptchaModule,
    RpcProviderModule,
    DevotesModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProjectMiddleware)
      .exclude({
        path: 'projects/:slug/slug',
        method: RequestMethod.GET,
      })
      .forRoutes(
        { path: 'projects/:id', method: RequestMethod.ALL },
        { path: 'projects/:id/*', method: RequestMethod.ALL },
      )
      .apply(CaptchaMiddleware)
      .forRoutes(
        { path: 'projects/:id', method: RequestMethod.POST },
        { path: 'projects/:id/devote', method: RequestMethod.POST },
      );
  }
}

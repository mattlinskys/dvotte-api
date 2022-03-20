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

@Module({
  imports: [
    JwtModule.register({}),
    MulterModule.register({
      dest: tempDir,
      preservePath: true,
    }),
    MikroOrmModule.forFeature([Project]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProjectMiddleware)
      .forRoutes(
        { path: 'projects/:id', method: RequestMethod.ALL },
        { path: 'projects/:id/*', method: RequestMethod.ALL },
      );
  }
}

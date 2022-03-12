import { Module } from '@nestjs/common';
import { ProjectsService } from 'projects/projects.service';
import { ProjectsController } from 'projects/projects.controller';
import { MulterModule } from '@nestjs/platform-express';
import tempDir from 'temp-dir';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({}),
    MulterModule.register({
      dest: tempDir,
    }),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}

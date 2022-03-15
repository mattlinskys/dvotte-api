import { Module } from '@nestjs/common';
import { ProjectsService } from 'projects/projects.service';
import { ProjectsController } from 'projects/projects.controller';
import { MulterModule } from '@nestjs/platform-express';
import tempDir from 'temp-dir';
import { JwtModule } from '@nestjs/jwt';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Project } from 'projects/entities/project.entity';
import { Contract } from 'contracts/entities/contract.entity';

@Module({
  imports: [
    JwtModule.register({}),
    MulterModule.register({
      dest: tempDir,
    }),
    MikroOrmModule.forFeature([Project, Contract]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}

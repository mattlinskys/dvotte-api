import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import type { Request } from 'express';
import { ProjectRepository } from 'projects/projects.repository';

@Injectable()
export class ProjectMiddleware implements NestMiddleware {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async use(req: Request) {
    const { id } = req.params;
    console.log('xx', id);
    const project = await this.projectRepository.findOne(id);
    if (!project) {
      throw new NotFoundException();
    }

    req.project = project;
  }
}

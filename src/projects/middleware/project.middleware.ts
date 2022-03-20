import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import type { NextFunction, Request } from 'express';
import { ProjectRepository } from 'projects/projects.repository';

@Injectable()
export class ProjectMiddleware implements NestMiddleware {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async use(req: Request, _, next: NextFunction) {
    const { id } = req.params;
    const project = await this.projectRepository.findOne(id);
    if (!project) {
      throw new NotFoundException();
    }

    req.project = project;
    next();
  }
}

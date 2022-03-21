import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { ProjectsService } from 'projects/projects.service';

@Injectable()
export class ProjectsLimitGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly projectsService: ProjectsService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    return (
      (await this.projectsService.countByOwnerAddress(
        req.accessPayload.address,
      )) < this.configService.get('app.maxProjectsPerAddress')
    );
  }
}

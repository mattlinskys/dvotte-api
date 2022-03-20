import { FindOneOptions } from '@mikro-orm/core';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateProjectDto } from 'projects/dto/create-project.dto';
import { UpdateProjectDto } from 'projects/dto/update-project.dto';
import { Project } from 'projects/entities/project.entity';
import { ProjectRepository } from 'projects/projects.repository';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async create(props: CreateProjectDto, ownerAddress: string) {
    if (await this.existsBySlug(props.slug)) {
      throw new ConflictException();
    }

    const project = new Project();
    Object.assign(project, props);
    project.ownerAddress = ownerAddress;

    await this.projectRepository.persistAndFlush(project);
    return project;
  }

  findMany() {}

  findOne(id: string, options?: FindOneOptions<Project, 'contracts'>) {
    return this.projectRepository.findOne(id, options);
  }

  findBySlug(slug: string, options?: FindOneOptions<Project, 'contracts'>) {
    return this.projectRepository.findOne({ slug }, options);
  }

  async existsBySlug(slug: string) {
    return !!(await this.findBySlug(slug, { fields: [] }));
  }

  async update(project: Project, updateProjectDto: UpdateProjectDto) {
    this.projectRepository.assign(project, updateProjectDto);
    await this.projectRepository.persistAndFlush(project);

    return project;
  }

  uploadBanner(project: Project, file: Express.Multer.File) {
    // TODO: Upload file
    // if (project.bannerUrl) {
    // }
  }

  async remove(id: string) {
    await this.projectRepository.removeAndFlush(
      this.projectRepository.getReference(id),
    );
  }
}

import { FindOneOptions } from '@mikro-orm/core';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ContractRepository } from 'contracts/contracts.repository';
import { CreateProjectDto } from 'projects/dto/create-project.dto';
import { UpdateProjectDto } from 'projects/dto/update-project.dto';
import { Project } from 'projects/entities/project.entity';
import { ProjectRepository } from 'projects/projects.repository';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly contractRepository: ContractRepository,
  ) {}

  async create(
    { contractIds, ...props }: CreateProjectDto,
    ownerAddress: string,
  ) {
    if (await this.existsBySlug(props.slug)) {
      throw new ConflictException();
    }

    const project = new Project();
    Object.assign(project, props);
    project.ownerAddress = ownerAddress;

    project.contracts.add(
      ...contractIds.map((id) => this.contractRepository.getReference(id)),
    );
    await project.contracts.loadItems();
    if (!project.contracts.isInitialized(true)) {
      throw new BadRequestException();
    }

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

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.findOne(id, { populate: ['contracts'] });
    if (!project) {
      throw new NotFoundException();
    }

    this.projectRepository.assign(project, updateProjectDto);
    await this.projectRepository.persistAndFlush(project);

    return project;
  }

  uploadBanner(id: string, file: Express.Multer.File) {}

  async remove(id: string) {
    await this.projectRepository.removeAndFlush(
      this.projectRepository.getReference(id),
    );
  }
}

import { CountOptions, FindOneOptions, FindOptions } from '@mikro-orm/core';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import path from 'path';
import mime from 'mime';
import { CreateProjectDto } from 'projects/dto/create-project.dto';
import { UpdateProjectDto } from 'projects/dto/update-project.dto';
import { Project } from 'projects/entities/project.entity';
import { ProjectRepository } from 'projects/repositories/projects.repository';
import { S3ManagerService } from 's3-manager/s3-manager.service';
import { ConfigService } from '@nestjs/config';
import { createReadStream } from 'fs';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { DeleteS3FileJobPayload } from 'cleaner/cleaner.types';
import {
  CLEANER_QUEUE_NAME,
  DELETE_S3_FILE_JOB_NAME,
} from 'cleaner/cleaner.constants';
import { DevoteRepository } from 'projects/repositories/devote.repository';
import { DevoteDto } from 'projects/dto/devote.dto';
import { RpcProviderService } from 'rpc-provider/rpc-provider.service';
import { Devote } from 'projects/entities/devote.entity';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly projectRepository: ProjectRepository,
    private readonly devoteReporsitory: DevoteRepository,
    private readonly s3ManagerService: S3ManagerService,
    private readonly rpcProviderService: RpcProviderService,
    @InjectQueue(CLEANER_QUEUE_NAME)
    private readonly cleanerQueue: Queue,
  ) {}

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

  findByOwnerAddress(ownerAddress: string, options?: FindOptions<Project>) {
    return this.projectRepository.find({ ownerAddress }, options);
  }

  countByOwnerAddress(ownerAddress: string, options?: CountOptions<Project>) {
    return this.projectRepository.count({ ownerAddress }, options);
  }

  findOne(id: string, options?: FindOneOptions<Project>) {
    return this.projectRepository.findOne(id, options);
  }

  findBySlug(slug: string, options?: FindOneOptions<Project>) {
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

  async uploadBanner(project: Project, file: Express.Multer.File) {
    const oldLocation = project.bannerUrl;
    const location = await this.s3ManagerService.uploadFile({
      Key: path.join(
        'banners',
        `${project.id}_${Date.now()}.${mime.getExtension(file.mimetype)}`,
      ),
      Bucket: this.configService.get('aws.staticFilesBucket'),
      Body: createReadStream(file.path),
      ACL: 'public-read',
    });

    project.bannerUrl = location;
    await this.projectRepository.persistAndFlush(project);

    if (oldLocation) {
      await this.cleanerQueue.add(DELETE_S3_FILE_JOB_NAME, {
        location: oldLocation,
      } as DeleteS3FileJobPayload);
    }

    return project;
  }

  async remove(project: Project) {
    if (project.bannerUrl) {
      await this.cleanerQueue.add(DELETE_S3_FILE_JOB_NAME, {
        location: project.bannerUrl,
      } as DeleteS3FileJobPayload);
    }

    await this.projectRepository.removeAndFlush(
      this.projectRepository.getReference(project.id),
    );
  }

  findDevotes(project: string | Project, offset: number, limit: number) {
    return this.devoteReporsitory.findAndCount(
      {
        project,
      },
      { offset, limit },
    );
  }

  async createDevote(project: Project, from: string, devoteDto: DevoteDto) {
    const transaction = await this.rpcProviderService
      .getProvider(devoteDto.chainId)
      .getTransaction(devoteDto.transactionHash);
    if (
      transaction.from !== from ||
      !project.contracts.some(
        ({ address, chainId }) =>
          address === transaction.to && chainId === devoteDto.chainId,
      )
    ) {
      throw new ForbiddenException();
    }

    const devote = new Devote();
    Object.assign(devote, devoteDto);
    devote.value = transaction.value.toString();
    devote.from = from;
    devote.project = project;

    await this.devoteReporsitory.persistAndFlush(devote);

    return devote;
  }
}

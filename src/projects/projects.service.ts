import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from 'projects/dto/create-project.dto';
import { UpdateProjectDto } from 'projects/dto/update-project.dto';

@Injectable()
export class ProjectsService {
  create(createProjectDto: CreateProjectDto, ownerAddress: string) {}

  findAll() {}

  findOne(id: string) {}

  update(id: string, updateProjectDto: UpdateProjectDto) {}

  uploadBanner(id: string, file: Express.Multer.File) {}

  async remove(id: string) {}
}

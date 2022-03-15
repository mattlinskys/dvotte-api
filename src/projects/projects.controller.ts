import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { ProjectsService } from 'projects/projects.service';
import { CreateProjectDto } from 'projects/dto/create-project.dto';
import { UpdateProjectDto } from 'projects/dto/update-project.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'auth/guards/auth.guard';
import { AccessPayload } from 'auth/decorators/accessPayload.decorator';
import { AccessTokenPayload } from 'auth/auth.types';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() createProjectDto: CreateProjectDto,
    @AccessPayload() { address }: AccessTokenPayload,
  ) {
    return this.projectsService.create(createProjectDto, address);
  }

  @Get()
  @ApiQuery({ name: 'ownerAddress' })
  @ApiQuery({ name: 'skip', type: 'number' })
  @ApiQuery({ name: 'take', type: 'number' })
  findMany() {
    return this.projectsService.findMany();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const project = await this.projectsService.findOne(id, {
      populate: ['contracts'],
    });
    if (!project) {
      throw new NotFoundException();
    }

    return project;
  }

  @Get(':slug/slug')
  async findBySlug(@Param('slug') slug: string) {
    const project = await this.projectsService.findBySlug(slug, {
      populate: ['contracts'],
    });
    if (!project) {
      throw new NotFoundException();
    }

    return project;
  }

  @Put(':id')
  // TODO: Access
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Post(':id/upload-banner')
  @UseInterceptors(FileInterceptor('banner'))
  uploadBanner(
    @Param('id') id: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException();
    }
    return this.projectsService.uploadBanner(id, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}

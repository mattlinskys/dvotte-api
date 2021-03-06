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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiParam,
} from '@nestjs/swagger';
import { AuthGuard } from 'auth/guards/auth.guard';
import { AccessPayload } from 'auth/decorators/accessPayload.decorator';
import { AccessTokenPayload } from 'auth/auth.types';
import { ProjectParam } from 'projects/decorators/project.decorator';
import { Project } from 'projects/entities/project.entity';
import { mimetypesFileFilter } from 'utils/multer.utils';
import { ProjectsLimitGuard } from 'projects/guards/projectsLimit.guard';
import { ProjectOwnerGuard } from 'projects/guards/projectOwner.guard';
import { RegisterDevoteDto } from 'projects/dto/register-devote.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiHeader({ name: 'captcha-token' })
  @UseGuards(AuthGuard, ProjectsLimitGuard)
  create(
    @Body() createProjectDto: CreateProjectDto,
    @AccessPayload() { address }: AccessTokenPayload,
  ) {
    return this.projectsService.create(createProjectDto, address);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  findMany(@AccessPayload() { address }: AccessTokenPayload) {
    return this.projectsService.findByOwnerAddress(address);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  async findOne(@ProjectParam() project: Project) {
    return project;
  }

  @Get(':slug/slug')
  @ApiParam({ name: 'slug' })
  async findBySlug(@Param('slug') slug: string) {
    const project = await this.projectsService.findBySlug(slug);
    if (!project) {
      throw new NotFoundException();
    }

    return project;
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard, ProjectOwnerGuard)
  update(
    @ProjectParam() project: Project,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(project, updateProjectDto);
  }

  @Post(':id/upload-banner')
  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        banner: {
          type: 'file',
          format: 'binary',
        },
      },
    },
  })
  @UseGuards(AuthGuard, ProjectOwnerGuard)
  @UseInterceptors(
    FileInterceptor('banner', {
      fileFilter: mimetypesFileFilter('image/jpeg', 'image/png'),
      limits: {
        fieldSize: 0,
        fields: 0,
        fileSize: 5 * 1024 * 1024,
        files: 1,
      },
    }),
  )
  uploadBanner(
    @ProjectParam() project: Project,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException();
    }
    return this.projectsService.uploadBanner(project, file);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard, ProjectOwnerGuard)
  remove(@ProjectParam() project: Project) {
    return this.projectsService.remove(project);
  }

  @Post(':id/devotes')
  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard)
  devote(
    @ProjectParam() project: Project,
    @AccessPayload() { address }: AccessTokenPayload,
    @Body() registerDevoteDto: RegisterDevoteDto,
  ) {
    return this.projectsService.registerDevote(
      project,
      address,
      registerDevoteDto,
    );
  }
}

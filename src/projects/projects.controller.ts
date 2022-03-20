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
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { AuthGuard } from 'auth/guards/auth.guard';
import { AccessPayload } from 'auth/decorators/accessPayload.decorator';
import { AccessTokenPayload } from 'auth/auth.types';
import { ProjectParam } from 'projects/decorators/project.decorator';
import { Project } from 'projects/entities/project.entity';
import { mimetypesFileFilter } from 'utils/multer.utils';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiBearerAuth()
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
  @ApiParam({ name: 'id' })
  async findOne(@ProjectParam() project: Project) {
    console.log(project);
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
  // TODO: Access Guard
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
  // TODO: Access Guard
  // TODO: Remove file after
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
  // TODO: access Guard
  remove(@ProjectParam() project: Project) {
    return this.projectsService.remove(project);
  }
}

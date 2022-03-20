import { OmitType } from '@nestjs/swagger';
import { CreateProjectDto } from 'projects/dto/create-project.dto';

export class UpdateProjectDto extends OmitType(CreateProjectDto, [
  'slug',
] as const) {}

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { WidgetVariant } from 'projects/enums/widgetVariant.enum';

export class CreateProjectDto {
  @ApiProperty({ enum: WidgetVariant })
  @IsEnum(WidgetVariant)
  widgetVariant: WidgetVariant;
}

import { Unique } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsHexColor,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @Unique()
  @IsString({ each: true })
  contractIds: string[];

  @ApiProperty()
  @IsHexColor()
  color: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(300)
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(5_000)
  content?: string;
}

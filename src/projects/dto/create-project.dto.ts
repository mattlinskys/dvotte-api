import { Unique } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsHexColor,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
} from 'class-validator';
import { SUPPORTED_CHAIN_IDS } from 'constants/chains.constants';
import { ContractDto } from 'projects/dto/contract.dto';
import { SocialType } from 'projects/enums/socialType.enum';

class SocialDto {
  @ApiProperty({ enum: SocialType })
  @IsEnum(SocialType)
  type: SocialType;

  @ApiProperty()
  @IsUrl()
  @MaxLength(400)
  url: string;
}

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  @Matches(/^\w+(?:-\w+)*$/)
  slug: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => ContractDto)
  @ArrayMaxSize(SUPPORTED_CHAIN_IDS.length)
  @Unique<ContractDto>({ properties: 'chainId' })
  contracts: ContractDto[];

  @ApiProperty()
  @IsHexColor()
  color: string;

  @ApiProperty()
  @IsString()
  @MaxLength(300)
  description: string;

  @ApiProperty()
  @IsString()
  @MaxLength(5000)
  content: string;

  @ApiProperty({ type: () => SocialDto })
  @IsArray()
  @Type(() => SocialDto)
  @ArrayMaxSize(Object.keys(SocialType).length)
  socials: SocialDto[];
}

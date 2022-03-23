import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, MaxLength } from 'class-validator';
import { ContractDto } from 'projects/dto/contract.dto';

export class DevoteDto {
  // TODO: Check ValidateNested
  @ApiProperty()
  @Type(() => ContractDto)
  contract: ContractDto;

  @ApiProperty()
  @IsString()
  transactionHash: string;

  @ApiProperty()
  @IsString()
  @MaxLength(300)
  content: string;
}

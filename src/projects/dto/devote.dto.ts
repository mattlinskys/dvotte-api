import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString, MaxLength } from 'class-validator';
import { SUPPORTED_CHAIN_IDS } from 'constants/chains.constants';

export class DevoteDto {
  @ApiProperty()
  @IsIn(SUPPORTED_CHAIN_IDS)
  chainId: number;

  @ApiProperty()
  @IsString()
  transactionHash: string;

  @ApiProperty()
  @IsString()
  @MaxLength(300)
  content: string;
}

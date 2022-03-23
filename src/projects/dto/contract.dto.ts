import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsIn } from 'class-validator';
import { SUPPORTED_CHAIN_IDS } from 'constants/chains.constants';

export class ContractDto {
  @ApiProperty()
  @IsEthereumAddress()
  address: string;

  @ApiProperty()
  @IsIn(SUPPORTED_CHAIN_IDS)
  chainId: number;
}

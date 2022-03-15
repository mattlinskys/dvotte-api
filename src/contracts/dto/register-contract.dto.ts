import { IsEthereumAddress, IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterContractDto {
  @ApiProperty()
  @IsEthereumAddress()
  address: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  chainId: number;
}

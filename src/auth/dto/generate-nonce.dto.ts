import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEthereumAddress } from 'class-validator';

export class GenerateNonceDto {
  @ApiProperty()
  @IsEthereumAddress()
  address: string;
}

export class GenerateNonceResponse {
  @ApiProperty()
  @Expose()
  nonceToken: string;
}

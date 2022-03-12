import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEthereumAddress, IsString } from 'class-validator';

export class GenerateNonceDto {
  @ApiProperty()
  @IsString()
  @IsEthereumAddress()
  address: string;
}

export class GenerateNonceResponse {
  @ApiProperty()
  @Expose()
  nonceToken: string;
}

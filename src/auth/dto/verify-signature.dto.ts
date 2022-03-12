import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsJWT, IsString } from 'class-validator';

export class VerifySignatureDto {
  @ApiProperty()
  @IsString()
  signature: string;

  @ApiProperty()
  @IsString()
  @IsJWT()
  nonceToken: string;
}

export class VerifySignatureResponse {
  @ApiProperty()
  @Expose()
  accessToken: string;
}

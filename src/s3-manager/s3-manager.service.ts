import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';

@Injectable()
export class S3ManagerService {
  constructor(
    @InjectAwsService(S3)
    private readonly s3: S3,
  ) {}

  async uploadFile(params: S3.PutObjectRequest) {
    const { Location } = await this.s3.upload(params).promise();
    return Location;
  }

  async deleteFileByLocation(location: string, bucket: string) {
    await this.s3
      .deleteObject({
        Key: new URL(location).pathname.slice(1),
        Bucket: bucket,
      })
      .promise();
  }
}

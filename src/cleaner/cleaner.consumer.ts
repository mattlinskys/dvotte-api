import { Processor, Process } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import {
  CLEANER_QUEUE_NAME,
  DELETE_S3_FILE_JOB_NAME,
} from 'cleaner/cleaner.constants';
import { DeleteS3FileJobPayload } from 'cleaner/cleaner.types';
import { S3ManagerService } from 's3-manager/s3-manager.service';

@Processor(CLEANER_QUEUE_NAME)
export class CleanerConsumer {
  constructor(
    private readonly configService: ConfigService,
    private readonly s3ManagerService: S3ManagerService,
  ) {}

  @Process(DELETE_S3_FILE_JOB_NAME)
  async deleteS3File(job: Job<DeleteS3FileJobPayload>) {
    await this.s3ManagerService.deleteFileByLocation(
      job.data.location,
      this.configService.get('aws.staticFilesBucket'),
    );
  }
}

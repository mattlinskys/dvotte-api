import { Module } from '@nestjs/common';
import { WidgetsService } from './widgets.service';
import { WidgetsController } from './widgets.controller';
import { MulterModule } from '@nestjs/platform-express';
import tempDir from 'temp-dir';

@Module({
  imports: [
    MulterModule.register({
      dest: tempDir,
    }),
  ],
  controllers: [WidgetsController],
  providers: [WidgetsService],
})
export class WidgetsModule {}

import { Module } from '@nestjs/common';
import { DevotesService } from './devotes.service';
import { DevotesController } from './devotes.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Devote } from 'devotes/entities/devote.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Devote])],
  controllers: [DevotesController],
  providers: [DevotesService],
  exports: [MikroOrmModule],
})
export class DevotesModule {}

import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Contract } from 'contracts/entities/contract.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Contract])],
  controllers: [ContractsController],
  providers: [ContractsService],
})
export class ContractsModule {}

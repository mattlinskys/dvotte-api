import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { RegisterContractDto } from './dto/register-contract.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  register(@Body() registerContractDto: RegisterContractDto) {
    return this.contractsService.register(registerContractDto);
  }

  @Get(':id')
  requestSync(@Param('id') id: string) {
    return this.contractsService.requestSync(id);
  }
}

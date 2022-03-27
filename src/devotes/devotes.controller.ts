import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiResponse, ApiQuery } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Devote } from 'devotes/entities/devote.entity';
import { PraseEthAddressPipe } from 'pipes/praseEthAddress.pipe';
import { ParseObjectIdPipe } from 'pipes/praseObjectId.pipe';
import { MultiResults } from 'types/multiResults.type';
import { DevotesService } from './devotes.service';

@Controller('devotes')
export class DevotesController {
  constructor(private readonly devotesService: DevotesService) {}

  @Get()
  @ApiResponse({ type: () => typeof new MultiResults<Devote>() })
  @ApiQuery({ name: 'project', required: false })
  @ApiQuery({ name: 'contract', required: false })
  @ApiQuery({ name: 'chainId', required: false })
  async findMany(
    @Query('offset', ParseIntPipe) offset: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('project', ParseObjectIdPipe) project?: string,
    @Query('contract', PraseEthAddressPipe) contract?: string,
    @Query('chainId') chainId?: number,
  ) {
    const [devotes, total] = await this.devotesService.findMany(
      { project, contract, chainId },
      offset,
      limit,
    );
    return plainToInstance(MultiResults, {
      results: devotes,
      total,
    });
  }
}

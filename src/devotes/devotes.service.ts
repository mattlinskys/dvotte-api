import { Injectable } from '@nestjs/common';
import { DevoteRepository } from 'devotes/repositories/devote.repository';

@Injectable()
export class DevotesService {
  constructor(private readonly devoteReporsitory: DevoteRepository) {}

  findMany(
    {
      project,
      contract: address,
      chainId,
    }: { project?: string; contract?: string; chainId?: number },
    offset: number,
    limit: number,
  ) {
    return this.devoteReporsitory.findAndCount(
      {
        project,
        ...(address && chainId
          ? {
              contract: { address, chainId },
            }
          : {}),
      },
      { offset, limit },
    );
  }
}

import { FindOneOptions } from '@mikro-orm/core';
import { ConflictException, Injectable } from '@nestjs/common';
import { ContractRepository } from 'contracts/contracts.repository';
import { Contract } from 'contracts/entities/contract.entity';
import { RegisterContractDto } from './dto/register-contract.dto';

@Injectable()
export class ContractsService {
  constructor(private readonly contractRepository: ContractRepository) {}

  async register({ address, chainId }: RegisterContractDto) {
    if (await this.existsByAddressAndChain(address, chainId)) {
      throw new ConflictException();
    }

    const contract = new Contract(address, chainId);

    await this.contractRepository.persistAndFlush(contract);
    return contract;
  }

  requestSync(id: string) {}

  async existsByAddressAndChain(address: string, chainId: number) {
    return !!(await this.findByAddressAndChain(address, chainId, {
      fields: [],
    }));
  }

  findByAddressAndChain(
    address: string,
    chainId: number,
    options?: FindOneOptions<Contract>,
  ) {
    return this.contractRepository.findOne({ address, chainId }, options);
  }
}

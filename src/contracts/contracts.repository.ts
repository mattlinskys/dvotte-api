import { EntityRepository } from '@mikro-orm/mongodb';
import { Contract } from 'contracts/entities/contract.entity';

export class ContractRepository extends EntityRepository<Contract> {}

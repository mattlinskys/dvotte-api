import {
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToMany,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
  Unique,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Expose } from 'class-transformer';
import { ContractRepository } from 'contracts/contracts.repository';
import { Project } from 'projects/entities/project.entity';

// export class ContractBlockchainData {}

@Entity({ customRepository: () => ContractRepository })
@Unique({ properties: ['address', 'chainId'] })
export class Contract {
  [EntityRepositoryType]?: ContractRepository;

  @PrimaryKey()
  _id: ObjectId;

  @Expose()
  @SerializedPrimaryKey()
  id: string;

  @Expose()
  @Property()
  address: string;

  @Expose()
  @Property()
  chainId: number;

  @Expose()
  @Property()
  lastSyncBlock = 0;

  @Expose()
  @Property({ nullable: true })
  lastSyncAt?: Date;

  @Expose()
  @Property()
  totalBalance = '0';

  @Expose()
  @Property()
  isVerified = false;

  @ManyToMany(() => Project, (project) => project.contracts)
  projects = new Collection<Project>(this);

  constructor(address: string, chainId: number) {
    this.address = address;
    this.chainId = chainId;
  }
}

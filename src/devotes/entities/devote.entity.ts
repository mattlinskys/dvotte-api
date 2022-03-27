import {
  Embedded,
  Entity,
  EntityRepositoryType,
  Index,
  ManyToOne,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
  Unique,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Expose } from 'class-transformer';
import { Project } from 'projects/entities/project.entity';
import { DevoteRepository } from 'devotes/repositories/devote.repository';
import { Contract } from 'entities/contract.entity';

@Entity({ customRepository: () => DevoteRepository })
export class Devote {
  [EntityRepositoryType]?: DevoteRepository;

  @PrimaryKey()
  _id: ObjectId;

  @Expose()
  @SerializedPrimaryKey()
  id: string;

  @Expose()
  @Unique()
  @Property()
  transactionHash: string;

  @Expose()
  @Embedded(() => Contract)
  contract: Contract;

  @ManyToOne(() => Project)
  project: Project;

  @Expose()
  @Property()
  from: string;

  @Expose()
  @Property()
  value: string;

  @Expose()
  @Property()
  note: string;

  @Expose()
  @Property()
  @Index()
  createdAt: Date = new Date();
}

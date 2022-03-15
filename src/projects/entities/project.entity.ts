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
import { Expose, Transform, Type } from 'class-transformer';
import { Contract } from 'contracts/entities/contract.entity';
import { ProjectRepository } from 'projects/projects.repository';

@Entity({ customRepository: () => ProjectRepository })
export class Project {
  [EntityRepositoryType]?: ProjectRepository;

  @PrimaryKey()
  _id: ObjectId;

  @Expose()
  @SerializedPrimaryKey()
  id: string;

  @Expose()
  @Property()
  title: string;

  @Expose()
  @Unique()
  @Property()
  slug: string;

  @Expose()
  @Property()
  ownerAddress: string;

  @Expose()
  @Type(() => Contract)
  @Transform(({ value }) => value.getItems())
  @ManyToMany(() => Contract)
  contracts = new Collection<Contract>(this);

  @Expose()
  @Property()
  color: string;

  @Expose()
  @Property({ nullable: true })
  description?: string;

  @Expose()
  @Property({ nullable: true })
  content?: string;

  @Expose()
  @Property()
  createdAt: Date = new Date();
}

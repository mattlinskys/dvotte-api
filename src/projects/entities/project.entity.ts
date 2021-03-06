import {
  Embeddable,
  Embedded,
  Entity,
  EntityRepositoryType,
  Enum,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
  Unique,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Expose, Type } from 'class-transformer';
import { SocialType } from 'projects/enums/socialType.enum';
import { ProjectRepository } from 'projects/repositories/projects.repository';
import { Contract } from 'entities/contract.entity';

@Embeddable()
export class Social {
  @Expose()
  @Enum(() => SocialType)
  type: SocialType;

  @Expose()
  @Property()
  url: string;
}

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
  @Embedded(() => Contract, { array: true })
  contracts: Contract[] = [];

  @Expose()
  @Property()
  color: string;

  @Expose()
  @Property({ nullable: true })
  bannerUrl?: string;

  @Expose()
  @Property({ nullable: true })
  description?: string;

  @Expose()
  @Property({ nullable: true })
  content?: string;

  @Expose()
  @Embedded(() => Social, { array: true })
  socials: Social[] = [];

  @Expose()
  @Property()
  createdAt: Date = new Date();
}

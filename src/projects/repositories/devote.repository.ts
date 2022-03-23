import { EntityRepository } from '@mikro-orm/mongodb';
import { Devote } from 'projects/entities/devote.entity';

export class DevoteRepository extends EntityRepository<Devote> {}

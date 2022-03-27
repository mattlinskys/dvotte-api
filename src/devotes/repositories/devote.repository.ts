import { EntityRepository } from '@mikro-orm/mongodb';
import { Devote } from 'devotes/entities/devote.entity';

export class DevoteRepository extends EntityRepository<Devote> {}

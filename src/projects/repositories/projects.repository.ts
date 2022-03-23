import { EntityRepository } from '@mikro-orm/mongodb';
import { Project } from 'projects/entities/project.entity';

export class ProjectRepository extends EntityRepository<Project> {}

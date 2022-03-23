import { Embeddable, Property } from '@mikro-orm/core';
import { Expose } from 'class-transformer';

@Embeddable()
export class Contract {
  @Expose()
  @Property()
  address: string;

  @Expose()
  @Property()
  chainId: number;
}

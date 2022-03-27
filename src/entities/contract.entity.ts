import { Embeddable, Property } from '@mikro-orm/core';
import { Expose } from 'class-transformer';

@Embeddable()
export class Contract {
  constructor(address: string, chainId: number) {
    this.address = address;
    this.chainId = chainId;
  }

  @Expose()
  @Property()
  address: string;

  @Expose()
  @Property()
  chainId: number;
}

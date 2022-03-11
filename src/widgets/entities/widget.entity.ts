import {
  Embeddable,
  Embedded,
  Entity,
  Enum,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { WidgetVariant } from 'widgets/enums/widgetVariant.enum';

@Embeddable()
export class ContractPair {
  @Property()
  contractAddress: string;

  @Property()
  chainId: number;
}

@Entity()
export class Widget {
  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id: string;

  @Property()
  ownerAddress: string;

  @Embedded(() => ContractPair, { array: true })
  contractPairs: ContractPair[] = [];

  @Enum(() => WidgetVariant)
  variant: WidgetVariant = WidgetVariant.Card;

  @Property()
  color: string;

  @Property({ nullable: true })
  description?: string;
}

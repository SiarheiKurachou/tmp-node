import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Order } from './order';

@Entity()
export class Delivery {

  @PrimaryKey()
  uuid: string = v4();

  @Property()
  type: string;

  @Property()
  address: string;

  @OneToOne(() => Order, order => order.delivery)
  order!: Order;

  constructor(type: string, address: string) {
    this.type = type;
    this.address = address;
  }
}
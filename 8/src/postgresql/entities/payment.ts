import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Order } from './order';

@Entity()
export class Payment {

  @PrimaryKey()
  uuid: string = v4();

  @Property()
  type: string;

  @Property()
  address: string;

  @Property()
  creditCard: string;

  @OneToOne(() => Order, order => order.payment)
  order!: Order;

  constructor(type: string, address: string, creditCard: string) {
    this.type = type;
    this.address = address;
    this.creditCard = creditCard;
  }
}
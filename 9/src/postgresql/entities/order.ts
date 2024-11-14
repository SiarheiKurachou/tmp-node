import { Entity, ManyToOne, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { User } from './user';
import { Cart } from './cart';
import { Payment } from './payment';
import { Delivery } from './delivery';

@Entity()
export class Order {

  @PrimaryKey()
  uuid: string = v4();

  @ManyToOne(() => User)
  user: User;

  @OneToOne(() => Cart, cart => cart.order, { owner: true })
  cart: Cart;

  @OneToOne(() => Payment, payment => payment.order, { owner: true })
  payment: Payment;

  @OneToOne(() => Delivery, delivery => delivery.order, { owner: true })
  delivery: Delivery;

  @Property()
  comment: string;

  @Property()
  status: string;

  @Property()
  total: number;

  constructor(user: User, cart: Cart, payment: Payment, delivery: Delivery, comment: string, status: string, total: number) {
    this.user = user;
    this.cart = cart;
    this.payment = payment;
    this.delivery = delivery;
    this.comment = comment;
    this.status = status;
    this.total = total;
  }
}
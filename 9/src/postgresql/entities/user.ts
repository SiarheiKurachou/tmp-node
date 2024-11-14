import { Collection, Entity, OneToMany, OneToOne, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { v4 } from 'uuid';
import { Cart } from "./cart";
import { Order } from "./order";

export type roleType = 'admin' | 'user';

@Entity()
export class User {
  @PrimaryKey()
  uuid: string = v4();

  @Property()
  @Unique()
  mail: string;

  @Property({ default: ''})
  password: string;

  @Property()
  role: roleType;

  @OneToOne(() => Cart, cart => cart.user, { owner: true, nullable: true })
  cart!: Cart;

  @OneToMany('Order', 'user')
  orders = new Collection<Order>(this);

  constructor(mail: string, password: string, role: roleType = 'user') {
    this.mail = mail;
    this.password = password;
    this.role = role;
  }
}
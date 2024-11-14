import { Collection, Entity, OneToMany, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from 'uuid';
import { Cart } from "./cart";
import { Order } from "./order";

@Entity()
export class User {
  @PrimaryKey()
  uuid: string = v4();

  @Property()
  name: string;

  @OneToOne(() => Cart, cart => cart.user, { owner: true, nullable: true })
  cart!: Cart;

  @OneToMany('Order', 'user')
  orders = new Collection<Order>(this);

  constructor(name: string) {
    this.name = name;
  }
}
import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { CartProduct } from './cartProduct';

@Entity()
export class Product {

  @PrimaryKey()
  uuid: string = v4();

  @Property()
  title: string;

  @Property()
  description: string;

  @Property()
  price: number;

  @OneToMany('CartProduct', 'product')
  cartProducts = new Collection<CartProduct>(this);

  constructor(title: string, description: string, price: number) {
    this.title = title;
    this.description = description;
    this.price = price;
  }
}
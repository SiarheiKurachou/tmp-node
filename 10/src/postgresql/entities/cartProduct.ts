import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Product } from './product';
import { Cart } from './cart';

@Entity()
export class CartProduct {

    @PrimaryKey()
    uuid: string = v4();

    @Property()
    count: number;

    @ManyToOne(() => Product)
    product: Product;

    @ManyToOne(() => Cart)
    cart: Cart;

    constructor(cart: Cart, product: Product, count: number) {
      this.product = product;
      this.count = count;
      this.cart = cart;
    }
}
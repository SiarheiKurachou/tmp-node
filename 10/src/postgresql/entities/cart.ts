import { Collection, Entity, OneToMany, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { CartProduct } from './cartProduct';
import { User } from './user';
import { Order } from './order';

@Entity()
export class Cart {

    @PrimaryKey()
    uuid: string = v4();

    @Property()
    isDeleted: boolean = false;

    @OneToMany({ entity: () => CartProduct, mappedBy: 'cart', orphanRemoval: true })
    products = new Collection<CartProduct>(this);

    @OneToOne(() => User, user => user.cart, { mappedBy: 'cart' })
    user!: User;

    @OneToOne(() => Order, order => order.cart, { mappedBy: 'cart' })
    order!: Order;

    constructor() {}
}
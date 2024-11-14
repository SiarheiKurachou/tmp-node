import { wrap } from '@mikro-orm/core';
import { DI } from '../server';
import { Cart } from '../postgresql/entities/cart';
import { User } from '../postgresql/entities/user';
import { Payment } from '../postgresql/entities/payment';
import { Delivery } from '../postgresql/entities/delivery';
import { Order } from '../postgresql/entities/order';

export const createCart = async (username: string) => {
  try {
    const cart = new Cart();
    const user = await DI.userRepository.findOne({ name: username }) as User;
    cart.user = user;
    DI.cartRepository.create(cart);

    const cartCreated = await DI.cartRepository.findOne({ user }) as Cart;

    await wrap(cartCreated?.products).init();
    return cartCreated;
  } catch (err) {
    console.error("Error creating cart: ", err);
  }
};

export const fetchCart = async (username: string) => {
  try {
    const user = await DI.userRepository.findOne({ name: username }) as User;
    const cart = await DI.cartRepository.findOne({ user, isDeleted: false }) as Cart;
    if (cart) {
      await wrap(cart.products).init();
    }
    return cart;
  } catch (err) {
    console.error("Error finding cart: ", err);
  }
};

export const removeCart = async (username: string) => {
  try {
    const user = await DI.userRepository.findOne({ name: username }) as User;
    await DI.cartRepository.nativeUpdate({ user, isDeleted: false }, { isDeleted: true });
    return true;
  } catch (err) {
    console.error("Error deleting cart: ", err);
  }
};

export const updateCart = async (username: string, updatedCart: Cart) => {
  try {
    const user = await DI.userRepository.findOne({ name: username }) as User;
    await DI.cartRepository.nativeUpdate({ user, isDeleted: false }, updatedCart);
    return true;
  } catch (err) {
    console.error("Error updating cart: ", err);
  }
};

export const createOrder = async (user: User, cart: Cart, payment: Payment, delivery: Delivery, total: number) => {
  try {
    const order = new Order(user, cart, payment, delivery, '', 'created', total);
    DI.orderRepository.create(order);
    
    const orderCreated = await DI.orderRepository.findOne({ user, cart }) as Order;
    return orderCreated;
  } catch (err) {
    console.error("Error creating order: ", err);
  }
}
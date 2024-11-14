import { Cart } from '../types/cart.interface';
import { Order } from '../types/order.interface';

import CartModel from '../mongo/mongo-models/cart';
import OrderModel from '../mongo/mongo-models/order';

export const createCart = async (userId: string) => {
  try {
    const cart = new CartModel({
      userId,
      isDeleted: false,
      items: [],
    });

    const savedCart = await cart.save();
    return savedCart;
  } catch (err) {
    console.error("Error creating cart: ", err);
  }
};

export const fetchCart = async (userId: string) => {
  try {
    const cart = await CartModel.findOne({ userId, isDeleted: false });
    return cart;
  } catch (err) {
    console.error("Error finding cart: ", err);
  }
};

export const removeCart = async (userId: string) => {
  try {
    const result = await CartModel.deleteOne({ userId });
    return true;
  } catch (err) {
    console.error("Error deleting cart: ", err);
  }
};

export const updateCart = async (userId: string, updatedCart: Cart) => {
  try {
    const result = await CartModel.updateOne(
      { userId, isDeleted: false }, 
      updatedCart
    );
    return true;
  } catch (err) {
    console.error("Error updating cart: ", err);
  }
};

export const createOrder = async (order: Omit<Order, 'id'>) => {
  try {
    const newOrder = new OrderModel(order);
    const saveOrder = await newOrder.save();
    return saveOrder;
  } catch (err) {
    console.error("Error creating order: ", err);
  }
}
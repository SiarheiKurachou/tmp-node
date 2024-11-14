import { CartItem } from "./cartItem.interface";

export interface Cart {
  id?: string,
  items: CartItem[]
};
import { CartItem } from "./cartItem.interface"

export interface Order {
  id: string,
  userId: string,
  cartId:	string,
  items:	CartItem[]
  payment: {
    type: string,
    address:	string,
    creditCard:	string
  },
  delivery:	{
    type:	string,
    address: string
  },
  comments:	string,
  status:	string,
  total: number
};
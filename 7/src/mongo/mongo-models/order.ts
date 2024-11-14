import mongoose, { Schema, Document } from 'mongoose';
import { CartItemSchema, ICartItem } from './cart';

const orderStatusList = ['created', 'completed'];
type ORDER_STATUS = typeof orderStatusList;

interface IOrder extends Document {
  userId: string;
  cartId: string;
  items: ICartItem[]
  payment: {
    type: string,
    address?: any,
    creditCard?: any,
  },
  delivery: {
    type: string,
    address: any,
  },
  comments: string,
  status: ORDER_STATUS;
  total: number;
}

const OrderSchema: Schema = new Schema({
  userId: { type: String, required: true },
  cartId: { type: String, required: true },
  items: { type: [ CartItemSchema ], required: true },
  payment: {
    type: { type: String, required: true },
    address: { type: String, required: false },
    creditCard: { type: String, required: false },
  },
  delivery: {
    type: { type: String, required: true },
    address: { type: String, required: true },
  },
  comments: { type: String, required: false, default: '' },
  status: { type: String, enum: orderStatusList, require: true},
  total: { type: Number, required: true }
});

export default mongoose.model<IOrder>('Order', OrderSchema);
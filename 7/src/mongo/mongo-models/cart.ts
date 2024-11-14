import mongoose, { Schema, Document } from 'mongoose';
import { IProduct, ProductSchema } from './product';

export interface ICartItem extends Document {
  product: IProduct;
  count: number;
}

export interface ICart {
  userId: string;
  isDeleted: boolean;
  items: ICartItem[];
}

export const CartItemSchema: Schema<ICartItem> = new Schema({
  product: { type: ProductSchema, required: true },
  count: { type: Number, required: true }
});

const CartSchema: Schema = new Schema({
  userId: { type: String, required: true },
  isDeleted: { type: Boolean, required: true },
  items: { type: [ CartItemSchema ], required: true },
});

export default mongoose.model<ICart>('Cart', CartSchema);
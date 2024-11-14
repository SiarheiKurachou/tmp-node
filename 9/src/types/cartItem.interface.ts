import { ProductItem } from "./product.interface";

export interface CartItem {
  product: ProductItem,
  count: number
}
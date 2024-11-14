import { getProductById, getProducts } from "../repository/product.repository";

export function getAllProducts() {
  return getProducts();
}

export function getProductItem(productId: string) {
  return getProductById(productId);
}
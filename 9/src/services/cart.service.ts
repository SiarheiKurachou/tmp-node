import { createOrder, createCart, fetchCart, removeCart } from "../repository/cart.repository";
import { getProductById } from "../repository/product.repository";
import { createCartProduct, deleteCartProduct, updateCartProduct } from "../repository/cartProduct.repository";
import { createPayment } from "../repository/payment.repository";
import { createDelivery } from "../repository/delivery.repository";
import { getUser } from "./user.service";
import { Cart } from "../postgresql/entities/cart";
import { Product } from "../postgresql/entities/product";
import { User } from "../postgresql/entities/user";
import { Payment } from "../postgresql/entities/payment";
import { Delivery } from "../postgresql/entities/delivery";

export async function getUserCart(userId: string, createNewCart = true) {
  const cart = await fetchCart(userId);
  if (cart) {
    return cart;
  } else if (createNewCart) {
    return createCart(userId);
  }
  return null;
}

export function deleteUserCart(userId: string) {
  return removeCart(userId);
}

export async function addProductToUserCart(userId: string, newCartItem: { productId: string, count: number }) {
  const productItem = await getProductById(newCartItem.productId);
  if (productItem) {
    const cart = await getUserCart(userId);
    if (cart) {
      const { productId, count } = newCartItem;
      const productIndex = Array.from(cart.products).findIndex(cartItem => cartItem.product.uuid === productId);

      if (count === 0 && productIndex > -1) {
        await deleteCartProduct(cart, productItem);
      } else if (productIndex > -1) {
        await updateCartProduct(cart, productItem, count);
      } else if (count !== 0) {
        await createCartProduct(cart, productItem, count);
      }
      return getUserCart(userId);
    }
  } else {
    return Promise.resolve(false);
  }
};

export async function createNewOrder(userId: string, cart: Cart) {
  const user = await getUser(userId) as User;
  const payment = await createPayment("paypal", "London", "1234-1234-1234-1234") as Payment;
  const delivery = await createDelivery("post", "London") as Delivery;
    
  let total = 0;
  for (let cartProduct of Array.from(cart.products)) {
    const product = await getProductById(cartProduct.product.uuid) as Product;
    total += product.price * cartProduct.count
  }

  return createOrder(user, cart, payment, delivery, total);
}
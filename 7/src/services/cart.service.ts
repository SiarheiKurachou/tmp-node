import { createOrder, createCart, updateCart, fetchCart, removeCart } from "../repository/cart.repository";
import { getProductById } from "../repository/product.repository";
import { Cart } from "../types/cart.interface";
import { CartItem } from "../types/cartItem.interface";

export function getUserCart(userId: string, createNewCart = true) {
  return fetchCart(userId).then(cart => {
    if (cart) {
      return cart;
    } else if (createNewCart) {
      return createCart(userId);
    }
    return null;
  })
}

export function deleteUserCart(userId: string) {
  return removeCart(userId);
}

export function addProductToUserCart(userId: string, newCartItem: { productId: string, count: number }) {
  return getProductById(newCartItem.productId).then(productItem => {
    if (productItem) {

      return getUserCart(userId).then(cart => {
        if (cart) {
          const cartItems = [...cart.items] as CartItem[];
  
          const { productId, count } = newCartItem;
          const productIndex = cart.items.findIndex(cartItem => cartItem.product.id === productId);
    
          if (count === 0 && productIndex > -1) {
            cartItems.splice(productIndex, 1);
          } else {
            cartItems[productIndex > -1 ? productIndex : cartItems.length] = { product: productItem, count };
          }
          const userCart = {
            userId,
            isDeleted: false,
            items: cartItems,
          };
  
          return updateCart(userId, userCart);
        }
      })
    } else {
      return Promise.resolve(false);
    }
  });
};

export function createNewOrder(userId: string, cart: Cart) {
  const order = {
    userId,
    cartId:	cart.id as string,
    items:	cart.items,
    payment: {
      type: "paypal",
      address: "London",
      creditCard: "1234-1234-1234-1234"
    },
    delivery: {
      type: "post",
      address: "London"
    },
    comments: '',
    status: "created",
    total: cart.items.reduce((acc, { product, count }) => acc + product.price * count, 0)
  };
  return createOrder(order);
}
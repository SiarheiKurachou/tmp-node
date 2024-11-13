import { CartEntity } from '../../schemas';
import { carts } from '../../data';

const getCurrentUserCart = async (userId: CartEntity['userId']) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  carts.find((cart) => !cart.isDeleted && cart.userId === userId);

const removeCurrentUserCart = async (userId: CartEntity['userId']) => {
  const index = carts.findIndex((cart) => !cart.isDeleted && cart.userId === userId);
  if (index !== -1) {
    carts.splice(index, 1);
  }
};

const updateCurrentUserCartItems = async (userId: CartEntity['userId'], items: CartEntity['items']) => {
  const index = carts.findIndex((cart) => !cart.isDeleted && cart.userId === userId);
  if (index !== -1) {
    carts[index].items = items;
  }
};

const createCart = async (cart: CartEntity) => {
  carts.push(cart);
};

export { getCurrentUserCart, removeCurrentUserCart, updateCurrentUserCartItems, createCart };

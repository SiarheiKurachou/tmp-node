import { randomUUID } from 'crypto';
import { CartEntity, CartItemEntity } from '../../schemas';
import * as repository from './cart.repository';
import { AppError } from '../../errors';
import { calculateCartItemsTotal, HttpStatusCode, Message } from '../../utils';
import { getProduct } from '../product';
import { createOrder } from '../order';

const getCurrentUserCart = async (userId: CartEntity['userId']) => {
  let cart = await repository.getCurrentUserCart(userId);
  if (!cart) {
    cart = {
      id: randomUUID(),
      userId,
      isDeleted: false,
      items: [],
    };
    await repository.createCart(cart);
  }

  const total = calculateCartItemsTotal(cart.items);
  return { cart: { id: cart.id, items: cart.items }, total };
};

const removeCurrentUserCart = async (userId: CartEntity['userId']) => {
  await repository.removeCurrentUserCart(userId);
};

const updateCurrentUserCartItems = async (
  userId: CartEntity['userId'],
  productId: CartItemEntity['product']['id'],
  count: CartItemEntity['count'],
) => {
  const cart = await repository.getCurrentUserCart(userId);
  if (!cart) {
    throw new AppError(Message.CartNotFound, HttpStatusCode.NotFound);
  }

  const itemIndex = cart.items.findIndex((item) => item.product.id === productId);
  if (itemIndex !== -1) {
    if (count === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].count = count;
    }
  } else {
    // eslint-disable-next-line no-lonely-if
    if (count > 0) {
      const product = await getProduct(productId);
      cart.items.push({ product, count });
    }
  }

  await repository.updateCurrentUserCartItems(userId, cart.items);

  const total = calculateCartItemsTotal(cart.items);
  return { cart: { id: cart.id, items: cart.items }, total };
};

const orderCurrentUserCart = async (userId: CartEntity['userId']) => {
  const cart = await repository.getCurrentUserCart(userId);
  if (!cart) {
    throw new AppError(Message.CartNotFound, HttpStatusCode.NotFound);
  }

  if (!cart.items.length) {
    throw new AppError(Message.CartEmpty, HttpStatusCode.BadRequest);
  }

  const order = await createOrder(userId, cart.id, cart.items);

  return { order };
};

export { getCurrentUserCart, removeCurrentUserCart, updateCurrentUserCartItems, orderCurrentUserCart };

import { CartItemEntity } from '../schemas';

const calculateCartItemsTotal = (items: CartItemEntity[]) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  items.reduce((acc, item) => acc + item.count * item.product.price, 0);

export { calculateCartItemsTotal };

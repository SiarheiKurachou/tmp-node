import { randomUUID } from 'crypto';
import { CartItemEntity, OrderEntity } from '../../schemas';
import * as repository from './order.repository';
import { calculateCartItemsTotal } from '../../utils';

const createOrder = async (userId: OrderEntity['userId'], cartId: OrderEntity['cartId'], items: CartItemEntity[]) => {
  const order: OrderEntity = {
    id: randomUUID(),
    userId,
    cartId,
    items: items.map((item) => ({ product: { ...item.product }, count: item.count })),
    status: 'created',
    total: calculateCartItemsTotal(items),
  };

  await repository.createOrder(order);

  return order;
};

export { createOrder };

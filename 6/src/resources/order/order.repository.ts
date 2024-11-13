import { orders } from '../../data';
import { OrderEntity } from '../../schemas';

const createOrder = async (order: OrderEntity) => {
  orders.push(order);
};

export { createOrder };

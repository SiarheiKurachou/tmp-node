import { ProductEntity } from '../../schemas';
import { AppError } from '../../errors';
import { HttpStatusCode, Message } from '../../utils';
import * as repository from './product.repository';

const getProducts = async () => repository.getProducts();

const getProduct = async (id: ProductEntity['id']) => {
  const product = await repository.getProduct(id);
  if (!product) {
    throw new AppError(Message.ProductNotFound, HttpStatusCode.NotFound);
  }

  return product;
};

export { getProducts, getProduct };

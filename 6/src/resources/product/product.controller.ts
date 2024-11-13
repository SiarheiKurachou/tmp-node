import { Request, Response, NextFunction } from 'express';
import { ProductEntity } from '../../schemas';
import * as service from './product.service';
import { HttpStatusCode } from '../../utils';

type GetByIdRequest = Request<{ id: ProductEntity['id'] }>;

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await service.getProducts();

    const responseData = { data: products, error: null };
    res.status(HttpStatusCode.Ok).json(responseData);
  } catch (err) {
    next(err);
  }
};

const getProduct = async (req: GetByIdRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await service.getProduct(id);

    const responseData = { data: product, error: null };
    res.status(HttpStatusCode.Ok).json(responseData);
  } catch (err) {
    next(err);
  }
};

export { getProducts, getProduct };

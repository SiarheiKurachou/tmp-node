import { Request, Response, NextFunction } from 'express';
import * as service from './cart.service';
import { HttpStatusCode } from '../../utils';

const getCurrentUserCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // authorization middleware already checked existence
    const userId = req.header('x-user-id')!;
    const cart = await service.getCurrentUserCart(userId);

    const responseData = { data: cart, error: null };
    res.status(HttpStatusCode.Ok).json(responseData);
  } catch (err) {
    next(err);
  }
};

const removeCurrentUserCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // authorization middleware already checked existence
    const userId = req.header('x-user-id')!;
    await service.removeCurrentUserCart(userId);

    const responseData = { data: { success: true }, error: null };
    res.status(HttpStatusCode.Ok).json(responseData);
  } catch (err) {
    next(err);
  }
};

const updateCurrentUserCartItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // authorization middleware already checked existence
    const userId = req.header('x-user-id')!;
    const { productId, count } = req.body;
    const cart = await service.updateCurrentUserCartItems(userId, productId, count);

    const responseData = { data: cart, error: null };
    res.status(HttpStatusCode.Ok).json(responseData);
  } catch (err) {
    next(err);
  }
};

const orderCurrentUserCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // authorization middleware already checked existence
    const userId = req.header('x-user-id')!;
    const order = await service.orderCurrentUserCart(userId);

    const responseData = { data: order, error: null };
    res.status(HttpStatusCode.Ok).json(responseData);
  } catch (err) {
    next(err);
  }
};

export { getCurrentUserCart, removeCurrentUserCart, updateCurrentUserCartItems, orderCurrentUserCart };

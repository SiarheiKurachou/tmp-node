import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { AppError } from '../errors';
import { HttpStatusCode, Message } from '../utils';

const validateUpdateUserChart = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    productId: Joi.string().required(),
    count: Joi.number().min(0).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    next(new AppError(Message.ProductsNotValid, HttpStatusCode.BadRequest));
  } else {
    next();
  }
};

export { validateUpdateUserChart };

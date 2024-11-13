import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';
import { HttpStatusCode } from '../utils/constants';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    next(err);
  }

  const statusCode = err instanceof AppError ? err.statusCode : HttpStatusCode.InternalServerError;
  const responseData = { data: null, error: { message: err.message } };

  res.status(statusCode).json(responseData);
};

export { errorHandler };

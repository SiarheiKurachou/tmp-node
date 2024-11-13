import { Request, Response, NextFunction } from 'express';
import { checkAuthorization } from '../resources/user';

const authorizationHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.header('x-user-id');
    await checkAuthorization(userId);

    next();
  } catch (err) {
    next(err);
  }
};

export { authorizationHandler };

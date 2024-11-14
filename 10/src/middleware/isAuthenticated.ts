import * as jwt from "jsonwebtoken";
import { User } from "../postgresql/entities/user";

export const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
      return res.status(401).send({
        data: null,
        error: {
          message: 'User is not authorized' 
        }
      });
  }

  const [tokenType, token] = authHeader.split(' ');

  if (tokenType !== 'Bearer') {
    return res.status(403).send({ 
      data: null,
      error: {
        message: 'Invalid token' 
      }
    });
  }

  try {
    const user = jwt.verify(token, process.env.TOKEN_KEY!) as User;
    req.user = user;
  } catch (err) {
    return res.status(403)
      .send({ 
        data: null,
        error: {
          message: 'You must be authorized user' 
        }
      });
  }
  return next();
};
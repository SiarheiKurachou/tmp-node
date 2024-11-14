import { getUser } from "../services/user.service";

export const isAuthorized = (req, res, next) => {
  const userId = req.headers['x-user-id'];
  if (!userId) {
    res.status(401)
      .send({ 
        data: null,
        error: {
          message: 'User is not authorized' 
        }
      });
  } else {
    getUser(userId).then(user => {
      if (!user) {
        res.status(403)
        .send({ 
          data: null,
          error: {
            message: 'You must be authorized user' 
          }
        });
      } else {
        next();
      }
    });
  }
};
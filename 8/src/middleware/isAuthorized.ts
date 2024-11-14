import { getUser } from "../services/user.service";

export const isAuthorized = async (req, res, next) => {
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
    const user = await getUser(userId);
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
  }
};
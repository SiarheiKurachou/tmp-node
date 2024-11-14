import { logger } from "../helpers/logger";

export const errorHandler = (err, req, res, next) => {
  logger.error('Internal server error', { metadata: err });
  res.status(500)
    .send({ message: 'Internal server error' });
};
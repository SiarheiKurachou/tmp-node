export const addContentTypeHeader = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
};
import http from 'http';
import { Router } from './router';
import { routes } from './resources/users';
import { errorResponseHandler } from './utils';

const PORT = process.env.PORT || 8000;

const router = Router.getInstance();
router.registerRoutes(routes);

const server = http.createServer((req, res) => {
  try {
    router.handleRequest(req, res);
  } catch (err) {
    errorResponseHandler(res, err);
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

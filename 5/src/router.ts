import { IncomingMessage, ServerResponse } from 'http';
import { ServerError } from './errors';
import { HttpStatusCode, Message, formatString } from './utils';
import { Route } from './types';

class Router {
  // eslint-disable-next-line no-use-before-define
  private static instance: Router;

  private routes: Route[];

  private constructor() {
    this.routes = [];
  }

  static getInstance(): Router {
    if (!this.instance) {
      this.instance = new Router();
    }

    return this.instance;
  }

  registerRoutes(routes: Route[]) {
    this.routes.push(...routes);
  }

  handleRequest(req: IncomingMessage, res: ServerResponse) {
    let routes = this.routes.filter((route) => route.path.test(req.url ?? ''));
    if (!routes.length) {
      throw new ServerError(formatString(Message.ResourceNotFound, [req.url ?? '']), HttpStatusCode.BadRequest);
    }

    routes = routes.filter((route) => route.method === req.method);
    if (!routes.length) {
      throw new ServerError(
        formatString(Message.HttpMethodNotImplemented, [req.method ?? '']),
        HttpStatusCode.NotImplemented,
      );
    }

    routes[0].handler(req, res);
  }
}

export { Router };

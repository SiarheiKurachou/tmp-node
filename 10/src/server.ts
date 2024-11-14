import express from 'express';
import config from './postgresql/orm.config';
import 'reflect-metadata';
import http from 'http';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Socket } from 'net';
import morgan from 'morgan';
import moment from 'moment';
import * as dotenv from 'dotenv'
dotenv.config()

import { isAuthenticated } from './middleware/isAuthenticated';
import { addContentTypeHeader } from './middleware/addJsonHeader';
import { errorHandler } from './middleware/errorHandler';

import { getProduct, getProductList } from './controllers/product.controllers';
import { createOrder, deleteCart, getCart, updateCart } from './controllers/cart.controllers';
import { createUser, getToken } from './controllers/user.controllers';

import { User } from './postgresql/entities/user';
import { Cart } from './postgresql/entities/cart';
import { Order } from './postgresql/entities/order';
import { Product } from './postgresql/entities/product';
import { CartProduct } from './postgresql/entities/cartProduct';
import { Delivery } from './postgresql/entities/delivery';
import { Payment } from './postgresql/entities/payment';
import { isAdmin } from './middleware/isAdmin';
import { isConnected } from './helpers/healthCheck';
import { logger } from './helpers/logger';

declare global {
  namespace Express {
    interface Request {
      user: User
    }
  }
}

export const DI = {} as {
  server: http.Server;
  orm: MikroORM,
  em: EntityManager,
  userRepository: EntityRepository<User>,
  cartRepository: EntityRepository<Cart>,
  orderRepository: EntityRepository<Order>,
  productRepository: EntityRepository<Product>,
  cartProductRepository: EntityRepository<CartProduct>,
  deliveryRepository: EntityRepository<Delivery>,
  paymentRepository: EntityRepository<Payment>,
};

export const app = express();
const userRouter = express.Router();
const cartRouter = express.Router();
const productRouter = express.Router();

const port = process.env.PORT || 8000;

let connections: Socket[] = [];

export const init = (async () => {
  DI.orm = await MikroORM.init<PostgreSqlDriver>(config);

  DI.em = DI.orm.em;
  DI.userRepository = DI.orm.em.getRepository(User);
  DI.cartRepository = DI.orm.em.getRepository(Cart);
  DI.orderRepository = DI.orm.em.getRepository(Order);
  DI.productRepository = DI.orm.em.getRepository(Product);
  DI.cartProductRepository = DI.orm.em.getRepository(CartProduct);
  DI.deliveryRepository = DI.orm.em.getRepository(Delivery);
  DI.paymentRepository = DI.orm.em.getRepository(Payment);

  morgan.token('date', (req, res) => {
    return moment().format('ddd, DD MMM YYYY HH:mm:ss');
  })

  app.use(express.json(), addContentTypeHeader);
  app.use(morgan('[:date] INFO :method :url - :response-time ms'));
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));

  app.get('/api/health', (req, res) => DI.orm.isConnected().then(connected => isConnected(res, connected)));

  userRouter.post('/register', (req, res) => createUser(req, res));
  userRouter.post('/login', (req, res) => getToken(req, res))

  cartRouter.use(isAuthenticated);
  productRouter.use(isAuthenticated);

  cartRouter.get('/', (req, res, next) => getCart(req, res));
  cartRouter.put('/', (req, res, next) => updateCart(req, res));
  cartRouter.delete('/', isAdmin, (req, res, next) => deleteCart(req, res));
  cartRouter.post('/checkout', (req, res, next) => createOrder(req, res));

  productRouter.get('/', (req, res, next) => getProductList(req, res, next));
  productRouter.get('/:productId', (req, res, next) => getProduct(req, res, next));

  app.use('/api/auth', userRouter);
  app.use('/api/profile/cart', cartRouter);
  app.use('/api/products', productRouter);
  app.use(errorHandler);
  app.use((req, res) => res.status(404).json({ message: 'No route found' }));

  DI.server = app.listen(port, () => {
    logger.debug(`'Dev server is started' at http://localhost:${port}`);
    logger.info(`'Server is started' at http://localhost:${port}`);
  });

  DI.server.on('connection', (connection) => {
    connections.push(connection);
    
    connection.on('close', () => {
      connections = connections.filter((currentConnection) => currentConnection !== connection);
    });
  });
})();

function shutdown() {
  logger.info('Received kill signal, shutting down gracefully');
  
  DI.server.close(() => {
    logger.info('Received kill signal, shutting down gracefully');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 20000);

  connections.forEach((connection) => connection.end());
  
  setTimeout(() => {
    connections.forEach((connection) => connection.destroy());
  }, 10000);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
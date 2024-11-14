import express from 'express';
import config from './postgresql/orm.config';
import 'reflect-metadata';
import http from 'http';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import {PostgreSqlDriver} from "@mikro-orm/postgresql";
import * as dotenv from 'dotenv'
dotenv.config()

import { isAuthorized } from './middleware/isAuthorized';
import { addContentTypeHeader } from './middleware/addJsonHeader';
import { errorHandler } from './middleware/errorHandler';

import { getProduct, getProductList } from './controllers/product.controllers';
import { createOrder, deleteCart, getCart, updateCart } from './controllers/cart.controllers';
import { createAdminUser } from './helpers/createAdminUser';

import { User } from './postgresql/entities/user';
import { Cart } from './postgresql/entities/cart';
import { Order } from './postgresql/entities/order';
import { Product } from './postgresql/entities/product';
import { CartProduct } from './postgresql/entities/cartProduct';
import { Delivery } from './postgresql/entities/delivery';
import { Payment } from './postgresql/entities/payment';

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
const cartRouter = express.Router();
const productRouter = express.Router();

const port = process.env.PORT || 8000;

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

  app.use(express.json(), addContentTypeHeader);
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
  app.use(isAuthorized);

  cartRouter.get('/', (req, res, next) => getCart(req, res));
  cartRouter.put('/', (req, res, next) => updateCart(req, res));
  cartRouter.delete('/', (req, res, next) => deleteCart(req, res));
  cartRouter.post('/checkout', (req, res, next) => createOrder(req, res));

  productRouter.get('/', (req, res, next) => getProductList(req, res, next));
  productRouter.get('/:productId', (req, res, next) => getProduct(req, res, next));

  app.use('/api/profile/cart', cartRouter);
  app.use('/api/products', productRouter);
  app.use(errorHandler);
  app.use((req, res) => res.status(404).json({ message: 'No route found' }));

  DI.server = app.listen(port, () => {
    console.log(`'Server is started' at http://localhost:${port}`);
  });

  createAdminUser();
})();


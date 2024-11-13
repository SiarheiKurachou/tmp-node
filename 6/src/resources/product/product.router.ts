import { Router } from 'express';
import * as controller from './product.controller';

const router = Router();

router.get('/products', controller.getProducts);
router.get('/products/:id', controller.getProduct);

export { router };

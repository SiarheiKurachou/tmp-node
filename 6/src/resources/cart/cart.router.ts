import { Router } from 'express';
import * as controller from './cart.controller';
import { validateUpdateUserChart } from '../../middlewares';

const router = Router();

router.get('/profile/cart', controller.getCurrentUserCart);
router.delete('/profile/cart', controller.removeCurrentUserCart);
router.put('/profile/cart', validateUpdateUserChart, controller.updateCurrentUserCartItems);
router.post('/profile/cart/checkout', controller.orderCurrentUserCart);

export { router };

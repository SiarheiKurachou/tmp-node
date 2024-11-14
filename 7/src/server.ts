import express from 'express';
import { isAuthorized } from './middleware/isAuthorized';
import { addContentTypeHeader } from './middleware/addJsonHeader';
import { errorHandler } from './middleware/errorHandler';
import { getProduct, getProductList } from './controllers/product.controllers';
import { createOrder, deleteCart, getCart, updateCart } from './controllers/cart.controllers';
import { connectToMongoDB } from './mongo/connetion';
import { createAdminUser } from './helpers/createAdminUser';

const app = express();
const cartRouter = express.Router();
const productRouter = express.Router();

export const serverInstance = app.listen(8000, () => {
  console.log('Server is started');
});

app.use(express.json(), isAuthorized, addContentTypeHeader);

cartRouter.get('/', (req, res, next) => getCart(req, res));
cartRouter.put('/', (req, res, next) => updateCart(req, res));
cartRouter.delete('/', (req, res, next) => deleteCart(req, res));
cartRouter.post('/checkout', (req, res, next) => createOrder(req, res));

productRouter.get('/', (req, res, next) => getProductList(req, res));
productRouter.get('/:productId', (req, res, next) => getProduct(req, res));

app.use('/api/profile/cart', cartRouter);
app.use('/api/products', productRouter);

app.use(errorHandler);

connectToMongoDB();
createAdminUser();
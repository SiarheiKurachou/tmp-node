import express from 'express';
import { router as productRouter } from './resources/product';
import { router as cartRouter } from './resources/cart';
import { authorizationHandler, errorHandler } from './middlewares';

const app = express();

app.use(express.json());
app.use(authorizationHandler);

app.use('/api', productRouter);
app.use('/api', cartRouter);

app.use(errorHandler);

export { app };

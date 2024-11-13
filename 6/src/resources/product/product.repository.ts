import { ProductEntity } from '../../schemas';
import { products } from '../../data';

const getProducts = async () => products;

const getProduct = async (id: ProductEntity['id']) => products.find((product) => product.id === id);

export { getProducts, getProduct };

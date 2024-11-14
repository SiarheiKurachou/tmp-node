import { DI } from '../server';
import { Product } from '../postgresql/entities/product';


export const getProductById = async (productId: string) => {
  try {
    const product = await DI.productRepository.findOne(productId);
    return product;
  } catch (err) {
    console.error("Error finding product: ", err);
  }
};

export const getProducts = async () => {
  try {
    const products = await DI.productRepository.findAll();
    if (!products.length) {
      return createFirstProduct();
    } else {
      return products;
    }
  } catch (err) {
    console.error("Error finding products: ", err);
  }
};

const createFirstProduct = async() => {
  try {
    const product = new Product("Book", "Interesting book", 200);
    DI.productRepository.create(product);
    
    const products = await DI.productRepository.findAll();
    return products;
  } catch (err) {
    console.error("Error creating product: ", err);
  }
}
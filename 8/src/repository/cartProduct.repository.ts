import { DI } from '../server';
import { Cart } from '../postgresql/entities/cart';
import { Product } from '../postgresql/entities/product';
import { CartProduct } from '../postgresql/entities/cartProduct';

export const createCartProduct = async (cart: Cart, product: Product, count: number) => {
  try {
    const cartProduct = new CartProduct(cart, product, count);
    DI.cartProductRepository.create(cartProduct);

    const cartProductCreated = await DI.cartProductRepository.findOne({ cart, product }) as CartProduct;
    return cartProductCreated;
  } catch (err) {
    console.error("Error creating cart product: ", err);
  }
};

export const updateCartProduct = async (cart: Cart, product: Product, count: number) => {
  try {
    await DI.cartProductRepository.nativeUpdate({ cart, product }, { count });

    const cartProductUpdated = await DI.cartProductRepository.findOne({ cart, product }) as CartProduct;
    return cartProductUpdated;
  } catch (err) {
    console.error("Error updating cart product: ", err);
  }
};

export const deleteCartProduct = async (cart: Cart, product: Product, ) => {
  try {
    await DI.cartProductRepository.nativeDelete({ cart, product });
    return true;
  } catch (err) {
    console.error("Error deleting cart product: ", err);
  }
};
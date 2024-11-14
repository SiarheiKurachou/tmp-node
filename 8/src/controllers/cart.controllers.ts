import { Product } from "../postgresql/entities/product";
import { getProductById } from "../repository/product.repository";
import { addProductToUserCart, createNewOrder, deleteUserCart, getUserCart } from "../services/cart.service";
import { validateUpdateCartRequestBody } from "../validation/validation";

export async function getCart(req, res) {
  const userId = req.headers['x-user-id'];
  const cart = await getUserCart(userId);
  if (!cart) {
    res.status(404)
      .send({
        data: null,
        error: { message: "Cart not found" },
      });
    return;
  }
  let total = 0;
  for (let cartProduct of Array.from(cart.products)) {
    const product = await getProductById(cartProduct.product.uuid) as Product;
    total += product.price * cartProduct.count
  }
  res.send({
    data: { 
      cart,
      total
    },
    error: null,
  });
}

export function deleteCart(req, res) {
  const userId = req.headers['x-user-id'];
  deleteUserCart(userId).then(() => {
    res.send({ 
      data: {
        success: true,
      },
      error: null
    });
  });
}

export async function createOrder(req, res) {
  const userId = req.headers['x-user-id'];
  const cart = await getUserCart(userId, false);
  if (!cart?.products.length) {
    res.status(400)
      .send({
        data: null,
        error: { message: "Cart is empty" },
      });
  } else {
    const order = await createNewOrder(userId, cart);
    res.send({ 
      data: { order },
      error: null
    });
  }
}

export async function updateCart(req, res) {
  const userId = req.headers['x-user-id'];
  const cart = await getUserCart(userId, false);
  if (!cart) {
    res.status(404)
      .send({
        data: null,
        error: { message: "Cart was not found" },
      });
  } else {
    const requestBody = validateUpdateCartRequestBody(req.body);
    const productValueInvalid = !!requestBody.error;
  
    if (productValueInvalid) {
      res.status(400)
      .send({
        data: null,
        error: { message: "Products are not valid" },
      });
    } else {
      const result = await addProductToUserCart(userId, requestBody.value);
      if (result) {
        const updatedCart = await getUserCart(userId, false);
        if (updatedCart) {
          let total = 0;
          for (let cartProduct of Array.from(updatedCart.products)) {
            const product = await getProductById(cartProduct.product.uuid) as Product;
            total += product.price * cartProduct.count
          }
          res.send({ 
            data: {
              cart: updatedCart,
              total
            },
            error: null
          });
        }
      } else {
        res.status(400)
          .send({
            data: null,
            error: { message: "Products are not valid" },
          });
        }
      }
    }
}
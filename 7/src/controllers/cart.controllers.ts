import { addProductToUserCart, createNewOrder, deleteUserCart, getUserCart } from "../services/cart.service";
import { validateUpdateCartRequestBody } from "../validation/validation";

export function getCart(req, res) {
  const userId = req.headers['x-user-id'];
  getUserCart(userId).then(cart => {
    if (cart) {
      res.send({
        data: { 
          cart,
          total: cart.items?.reduce((acc, { product, count }) => acc + product.price * count, 0)
        },
        error: null,
      });
    }
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

export function createOrder(req, res) {
  const userId = req.headers['x-user-id'];
  getUserCart(userId, false).then(cart => {
    if (!cart?.items.length) {
      res.status(400)
        .send({
          data: null,
          error: { message: "Cart is empty" },
        });
    } else {
      createNewOrder(userId, cart).then(order => {
        res.send({ 
          data: { order },
          error: null
        });
      });
    }
  })
}

export function updateCart(req, res) {
  const userId = req.headers['x-user-id'];
  getUserCart(userId, false).then(cart => {
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
        addProductToUserCart(userId, requestBody.value)?.then(result => {
          if (result) {
            getUserCart(userId, false).then(updatedCart => {
              if (updatedCart) {
                res.send({ 
                  data: {
                    cart: updatedCart,
                    total: updatedCart.items.reduce((acc, { product, count }) => acc + product.price * count, 0)
                  },
                  error: null
                });
              }
            });
          } else {
            res.status(400)
              .send({
                data: null,
                error: { message: "Products are not valid" },
              });
          }
        })
      }
    }
  })
}
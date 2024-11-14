import { getAllProducts, getProductItem } from "../services/product.service";

export function getProductList(req, res) {
  getAllProducts().then(productList => {
    res.send({
      data: productList ?? [],
      error: null
    });
  })
}

export function getProduct(req, res) {
  const productId = req.params.productId;
  getProductItem(productId).then(product => {
    if (product) {
      res.send({
        data: product,
        error: null
      });
    } else {
      res.status(404);
      res.send({ 
        data: null,
        error: {
          message: "No product with such id"
        }
      });
    }
  });
}
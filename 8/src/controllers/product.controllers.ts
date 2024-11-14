import { getAllProducts, getProductItem } from "../services/product.service";

export async function getProductList(req, res, next) {
  const productList = await getAllProducts();
  res.send({
    data: productList ?? [],
    error: null
  });
}

export async function getProduct(req, res, next) {
  const productId = req.params.productId;
  const product = await getProductItem(productId);
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
}
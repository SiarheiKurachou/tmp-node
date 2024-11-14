import ProductModel from '../mongo/mongo-models/product';

export const getProductById = async (productId: string) => {
  try {
    const product = await ProductModel.findOne({ _id: productId });
    return product;
  } catch (err) {
    console.error("Error finding product: ", err);
  }
};

export const getProducts = async () => {
  try {
    let products = await ProductModel.find();
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
    const product = new ProductModel({
      title: "Book",
      description: "Interesting book",
      price: 200
    });

    const savedProduct = await product.save();
    return [ savedProduct ];
  } catch (err) {
    console.error("Error creating product: ", err);
  }
}
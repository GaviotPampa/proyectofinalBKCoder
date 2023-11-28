import { ProductFakeModel } from '../persistence/daos/mongodb/models/productFake.model.js';
import generateProduct from '../utils/fakeProductGenerator.js';

export const createProductsMock = async () => {
  try {
    const products = [];
    for (let id = 1; id <=100; id++) {
      const product = generateProduct();
      products.push(product);
    }
    console.log(products);
    return await ProductFakeModel.create(products);
  } catch (error) {
    console.log(error);
  }
};

export const getProductsMock = async() => {
  try {
    return await ProductFakeModel.find({});
  } catch (error) {
    console.log(error);
  }
};
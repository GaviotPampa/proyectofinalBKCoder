import fs from "fs";
import { __dirname } from "../../../utils.js";
const pathFile = __dirname + "/data/products.json";

/* export default class ProductManager {
  constructor(path) {
    this.products = [];
    pathFile = path;
  } */

///lectura del archivo
export const getAllProd = async () => {
  try {
    if (fs.existsSync(pathFile)) {
      const products = await fs.promises.readFile(pathFile, "utf-8");
      const productsJs = JSON.parse(products);
      return productsJs;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};
export const createProd = async (obj) => {
  try {
    const product = {
      id: (await getMaxId()) + 1,
      ...obj,
    };
    const productsFile = await getAllProd();
    productsFile.push(product);
    await fs.promises.writeFile(pathFile, JSON.stringify(productsFile));
    return product;
  } catch (error) {
    console.log(error);
  }
};

export const getMaxId = async () => {
  let maxId = 0;
  const products = await getAllProd();
  products.map((product) => {
    if (product.id > maxId) maxId = product.id;
  });
  return maxId;
};

export const getById = async (id) => {
  try {
    const products = await getAllProd();
    const product = products.find((product) => product.id === id);

    if (product) {
      return product;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateProd = async (obj, id) => {
  try {
    const productsFile = await getAllProd();
    const productIndex = productsFile.filter((product) => product.id === id);
    if (productIndex === id) {
      return { ...obj, id };
      {
      }
    } else {
      throw new Error("Product not found ✖");
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteProd = async (id) => {
  try {
    const productsFile = await getAllProd();
    const productFilter = productsFile.filter((product) => product.id === id);
    if (productFilter != id) {
      throw new Error("Product not found");
    } else {
      productsFile.splice(productIndex, 1);
    }
    await fs.promises.writeFile(pathFile, JSON.stringify(productsFile));
  } catch (error) {
    console.log(error);
  }
};

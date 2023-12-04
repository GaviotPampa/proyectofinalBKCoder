//en el servicio llamamos a la clase con su método
//desde los servicios llamamos al dao
import ProdDaoMDB from "../persistence/daos/mongodb/product.dao.js";
const prodDao = new ProdDaoMDB();
import * as service from "../persistence/repositories/product/product.repository.js";


// import { __dirname } from "../utils.js";
// import ProductDaoFS from "../dao/filesystem/product.dao.js";
// const prodDao = new ProductDaoFS(__dirname+'/dao/filesystem/products.json');
export const getAllProdServ = async () => {
  try {
    const response = await prodDao.getAllProd();
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getById = async (id) => {
  try {
    const item = await prodDao.getById(id);
    if (!item) return false;
    else return item;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getByIdDto = async (id) => {
  try {
    const item = await prodDao.getById(id);
    if (!item) return false;
    else return item;
  } catch (error) {
    throw new Error(error.message);
  }
};

/* export const createProd = async (obj) => {
  try {
    const newProduct = await prodDao.createProd(obj);
    if (!newProduct) return false;
    else return newProduct;
  } catch (error) {
    throw new Error(error.message);
  }
}; */

export const createProd = async (obj) => {
  try {
    const newProduct = await service.createProd(obj);
    if (!newProduct) return false;
    else return newProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProd = async (id, obj) => {
  try {
    const item = await prodDao.updateProd(id, obj);
    return item;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addProdToCart = async (cartId, productId, quantity) => {
  try {
    const prodExists = await prodDao.getById(productId);
    const newProdCart = await prodDao.addProdToCart(
      cartId,
      productId,
      quantity
    );
    if (!prodExists) throw new Error("Product not found");
    else return newProdCart;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const deleteServ = async (id) => {
  try {
    const item = await prodDao.deleteProd(id);
    return item;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProdPaginateServ = async (page, limit) => {
  try {
    const item = await prodDao.getProdPaginate(page, limit);
    if (!item) throw new Error("Item Paginate not found");
    else return item;
  } catch (error) {
    throw new Error(error.message);
  }
};

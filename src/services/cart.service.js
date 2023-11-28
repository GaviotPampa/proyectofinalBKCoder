import CartDaoMDB from "../persistence/daos/mongodb/cart.dao.js";
const cartDao = new CartDaoMDB();

import ProdDaoMongoDB from "../persistence/daos/mongodb/product.dao.js";
const prodDao = new ProdDaoMongoDB();
export const getAll = async () => {
  try {
    const response = await prodDao.getAllProd();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (pid) => {
  try {
    const item = await cartDao.getById(pid);
    if (!item) return false;
    else return item;
  } catch (error) {
    console.log(error);
  }
};

export const createCartServ = async (obj) => {
  try {
    const newCart = await cartDao.createCart(obj);
    if (!newCart) return false;
    else return newCart;
  } catch (error) {
    console.log(error);
  }
};

export const updatedCartServ = async (cid, obj) => {
  try {
    const itemCart = await cartDao.saveProductToCart(cid, obj);
    return itemCart;
  } catch (error) {
    console.log(error);
  }
};

export const addCartToUser = async (cid, idUser) => {
  try {
    const itemCartExists = await cartDao.getById(cid);
    const youCart = await cartDao.addCartToUser(idUser, cid)
    if (!itemCartExists) throw new Error (`Cart ${cid} not exists`);
    else return youCart;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCartServ = async (cid) => {
  try {
    const cart = await cartDao.deleteCart({_id: cid});
    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const removeProdToCart = async ( pid) => {
  try {
    const prodRemove = await cartDao.removeProd({_id: pid});
    console.log(prodRemove);
    return prodRemove;
  } catch (error) {
    console.log(error);
  }
};

import fs from 'fs';
import {__dirname} from '../../../utils.js';
import { getProdById, getMaxId } from './product.dao.js';  
const pathFile = __dirname + "/data/carts.json";

export const getAllCarts = async () => {
    try {
      if (fs.existsSync(pathFile)) {
        const carts = await fs.promises.readFile(pathFile, "utf-8");
        const cartsJSON = JSON.parse(carts);
        return cartsJSON;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const createCart = async (obj) => {
    try {
      const product = {
        id : (await getMaxId()) + 1,
        ...obj,
      };
      const cartsFile = await getAllCarts();
      cartsFile.push(product);
      await fs.promises.writeFile(pathFile, JSON.stringify(cartsFile));
      return product;
    } catch (error) {
      console.log(error);
    }
  };

  export const getCartById = async (id) => {
    try {
      const carts = await getAllCarts();
      const cart = carts.find((product) => product.id === id);
      if (cart) {
        return cart;
      } else{
      return false;
    }
    } catch (error) {
      console.log(error);
    }
  };

export const saveProductToCart = async (idCart, idProduct) => {
  try {
    const cartsFile = await getAllCarts();
    const cartExist = await getCartById(idCart);
    //verificar si el producto existe
    const prodExistsinJson = await getProdById(idProduct);
    if(prodExistsinJson){
      //si el carrito existe, se busca si el producto existe
      if(cartExist) {
          const prodExistsinCart = cartExist.products.find(product => product.id === idProduct);
          if(prodExistsinCart) {
            prodExistsinCart.quantity + 1
          } else {
            //crcear un objeto producto con el id y la cantidad
            const prod = {
              id: idProduct,
              quantity: 1
            }
            cartExist.products.push(prod);
          }
          await fs.promises.writeFile(pathFile, JSON.stringify(cartsFile));
          return cartExist
      }
    } else {
      throw new Error('product not found')
    }
  } catch (error) {
    
  }
    
};
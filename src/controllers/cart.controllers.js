import * as service from "../services/cart.service.js";
import  logger  from "../middlewares/logger-mw.js";

export const getAll = async (req, res, next) => {
  try {
    const cart = await service.getAll();
    if (cart) {
      res.status(200).json(cart);

    }else {
      res.json ({message: "Cart not found"})
    }
  } catch (error) {
    next(error.message);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const productInCart = await service.getById({_id: pid});
    if (!productInCart) res.status(404).json({ message: "Product not found in Cart" });
    else res.status(200).json(productInCart);
  } catch (error) {
    next(error.message);
  }
};

export const create = async (req, res, next) => {
  try {
    const newProdInCart = await service.createCartServ(req.body);
    logger.info(newProdInCart);
    if (!newProdInCart) res.status(404).json({ message: "Validation error" });
    else res.status(200).json(newProdInCart);
    logger.info("Product successfully added to cart");
    return newProdInCart;
  } catch (error) {
    next(error.message);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prodUpd = await service.updatedCartServ({_id: id}, req.body);
    res.json(prodUpd);
  } catch (error) {
    next(error.message);
  }
};

export const addCartToUser = async (req, res, next) => {
  try {
    const {cartId} = req.params;
    const {idUser} = req.params;
    const youCart = await service.addCartToUser(idUser, cartId);
    res.json(youCart);
  } catch (error) {
    next (error.message);
  }
}
export const expunge = async (req, res, next) => {
  try {
    const { id } = req.params;
    const itemsDele = await service.deleteCartServ(id);
    res.json(itemsDele);
  } catch (error) {
    next(error.message);
  }
};
export const removeItem = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const prodRemove = await service.removeProdToCart({_id: pid});
      if (prodRemove){
        res.json({
          status: true,
          message: 'Producto eliminado!'
      })
      } else {
        res.json({
          status: false,
          message: 'No se puede eliminar'
      })
      }
    } catch (error) {
      next(error.message);
    }
  };

  export const compararStock = async (req,res,next)=> {
    try {
      const {cartId, quantity} = req.params;
      for (let i = 0; i < cartId.length; i++) {
        const item = cartId[i];
        const stock = quantity[item.id].stock;
        if (item.quantity > stock) {
          return false;
        }
      }
      return true;
    } catch (error) {
      logger.error(error);
    }
    
  }
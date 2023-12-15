import TkDaoMongoDB from "../persistence/daos/mongodb/ticket.dao.js";
import userDao from "../persistence/daos/mongodb/user.dao.js";
import ProdDaoMDB from "../persistence/daos/mongodb/product.dao.js";
import logger from "../middlewares/logger-mw.js";
const tkDao = new TkDaoMongoDB();

export const getAllTkServ = async () => {
  try {
    const response = await tkDao.getAllTk();
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const generateTicket = async (userId) => {
  try {
    const user = await userDao.getById(userId);
    if (!user) return false;
    let amountAcc = 0;
    for (const prod of user.cart) {
      const idProd = prod._id.toString();
      const prodDB = await ProdDaoMDB.getById(idProd);
      if (prod.quantity <= prodDB.stock) {
        const amount = prod.quantity * prodDB.price;
        amountAcc += amount;
      }
    }
    if (prod.quantity <= prodDB.stock) {
      const amount = prod.quantity * prodDB.price;
      amountAcc += amount;
    }
    return ticket;
  } catch (error) {
    logger.error("en ticket service generate ticket",error);
    throw new Error(error.message);
  }
};

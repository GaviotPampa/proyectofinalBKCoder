import TkDaoMongoDB from "../persistence/daos/mongodb/ticket.dao.js";

const tkDao = new TkDaoMongoDB();

export const getAllTkServ = async () => {
  try {
    const response = await tkDao.getAllTk();
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const create = async (obj) => {
  try {
    const newTk = await tkDao.generateTicket(obj);
    if (!newTk) return false;
    else return newTk;
  } catch (error) {
    console.log(error);
  }
};

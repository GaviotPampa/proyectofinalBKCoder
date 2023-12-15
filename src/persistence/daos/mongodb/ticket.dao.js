import { TicketModel } from "./models/ticket.model.js";
import logger from "../../../middlewares/logger-mw.js";
export default class TkDaoMongoDB {
  async getAllTk() {
    try {
      const response = await TicketModel.find({});
      return response;
    } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }
  }

  async getById(id) {
    try {
      const response = await TicketModel.findById(id);
      return response;
    } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }
  }
  async create(obj) {
    try {
      const response = await TicketModel.create(obj);
      return response;
    } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }
  }
}

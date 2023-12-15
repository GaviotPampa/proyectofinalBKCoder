import * as service from "../services/ticket.service.js";
import { HttpResponse } from "../utils/http.response.js";
import { createResponse } from "../utils.js";

const httpResponse = new HttpResponse();
export const getAllTk= async (req, res, next) => {
    try {
      const response = await service.getAllTkServ();
      if (!response) return httpResponse.ServerError(res, "No response");
      return httpResponse.Ok(res, response);
    } catch (error) {
      next(error.message);
    }
  };

export const  generateTicket = async (req, res, next) =>{
    try {
        const { _id } = req.user;
        const ticket = await service.create(_id);
        if(!ticket) createResponse(res, 404, 'Error generating ticket');
        createResponse(res, 200, ticket);
    } catch (error) {
        next(error.message);
    }
};


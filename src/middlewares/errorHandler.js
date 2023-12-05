import { HttpResponse } from "../utils/http.response.js";
import logger from './logger-mw.js';

const http = new HttpResponse();
/* controlador de errores */
export const errorHandler = (error, req, res, next) => {
    logger.debug(error.stack);
    const status = error.statusCode || 500
    return http.ServerError(res, error.message, status);

}

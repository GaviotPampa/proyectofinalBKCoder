import { Router } from "express";
import * as controller from "../controllers/ticket.controllers.js";
import { checkAuth } from "../middlewares/checkAuth.js";
const router = Router();

 /* permitirá finalizar el proceso de compra de dicho carrito */


router
  .get("/", controller.getAllTk)
  .post("/ticket/purchase", checkAuth, controller.generateTicket);

export default router;

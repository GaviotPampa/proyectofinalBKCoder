import { Router } from "express";
import * as controller from "../controllers/ticket.controllers.js";
import { checkAuth } from "../middlewares/isAuth.js";
/* import { getAll } from "../controllers/cart.controllers.js";
 */
const router = Router();

router
  .get("/", controller.getAllTk)
  .post("/", checkAuth, controller.generateTicket);

export default router;

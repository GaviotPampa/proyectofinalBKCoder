import { Router } from "express";
const router = Router();
import { checkUserRole } from "../middlewares/checkUserRole.js";

import * as controller from "../controllers/product.controllers.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";

router
  .get("/", controller.getAllProd)

  .get("/:pid", controller.getById)

  .get("/prodDto/:pid", controller.getByIdDto)

  /* Sólo el usuario puede agregar productos a su carrito. */

  .post(
    "/add/:idCart/:idProduct/quantity/:quantity",
    checkUserRole,
    controller.addProdToCart
  )
  /* Sólo el administrador puede crear, actualizar y eliminar productos */
  /* .post("/", */ /* checkAdmin,  *//* controller.createProd) */
  .post("/", checkAdmin, controller.createProdDto)
  .put("/:pid", checkAdmin, controller.update)

  .delete("/:pid", checkAdmin, controller.expunge)

  .get("/paginate", controller.getPaginate);

export default router;

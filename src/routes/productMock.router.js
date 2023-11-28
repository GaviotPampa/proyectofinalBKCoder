import * as productController from "../controllers/productMock.controllers.js";

import { Router } from "express";
const router = Router();

router
  .get("/mockingproducts", productController.getProductsMock)
  .post("/mockingproducts", productController.createProductsMock);

export default router;
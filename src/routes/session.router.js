//**para los metodos de registro y login de users* */

/* ruta /current al router api/sessions la cual utilizara el modelo de session utilizado para devolver respuesta al usuario actual */
import { Router } from "express";
const router = Router();
import * as controller from "../controllers/views.controllers.js";

router
  .get("/login", controller.login)
  .get("/register", controller.register)
  .get("/profile", controller.profile)
  .get("/error-login", controller.errorLogin)
  .get("/error-register", controller.errorRegister)

 
/* router.get("/current", controller.sessionCurrent); */

export default router;

/* 
router de vistas en la ruta base / para llevar al formulario de login, de registro y de perfil. */

import { Router } from "express";
const router = Router();

import * as controller from "../controllers/views.controllers.js";
/* import {
  login,
  register,
  profile,
  products,
} from "../controllers/views.controllers.js"; */

router
  .get("/home", (req, res) => {
    res.render("home");
  })
  .get("/login", (req, res) => {
    res.render(login);
  })
  .get("/register", (req, res) => {
    res.render(register);
  })
  /*  .get('/login', controller.login)
  .get('/register',controller.register)
  .get('/profile', controller.profile) */
   .get("/profile", (req, res) => {
    res.render(profile);
  })
  .get("/error-login", controller.errorLogin)
  /*  .get("/error-register", controller.errorRegister) */
  .get("/error-register", (req, res) => {
    res.render(errorRegister);
  })
  .get("/user-restart", (req, res) => {
    res.render("userRestart", {});
  })
  /*  .get("/products", controller.products) */
  /* router.get("/:id", cartId); */
  .get("/products", (req, res) => {
    res.render("products", { products });
  })
  .get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts");
  })
  .post("/login", (req, res) => {
    res.render("login");
  });

export default router;

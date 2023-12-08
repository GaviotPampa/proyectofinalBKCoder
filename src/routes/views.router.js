/* 
router de vistas en la ruta base / para llevar al formulario de login, de registro y de perfil. */

import { Router } from "express";
const router = Router();

import * as controller from "../controllers/views.controllers.js";

router
  .get("/home", (req, res) => {
    res.render("home");
  })
  .get("/login", (req, res) => {
    res.render("login");
  })
  .get("/register", (req, res) => {
    res.render("register");
  })

  .get("/profile", (req, res) => {
    res.render("profile");
  })
  .get("/error-login", controller.errorLogin)
  .get("/error-register", controller.errorRegister)

  .get("/reset-pass", controller.resetPass)
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

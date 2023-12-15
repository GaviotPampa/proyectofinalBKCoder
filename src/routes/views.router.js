/* 
router de vistas en la ruta base / para llevar al formulario de login, de registro y de perfil. */

import { Router } from "express";
const router = Router();

/* import * as controller from "../controllers/views.controllers.js"; */

router
  .get("/home", (req, res) => {
    res.render("home");
  })
  .get("/login", async (req, res) => {
    res.render("login");
  })
  .get("/register", (req, res) => {
    res.render("register");
  })

  .get("/profile", (req, res) => {
    console.log("profile views router", req.user);
    const user = req.user;
    res.render("profile", { user });
  })
  .get("/error-login", (req, res) => {
    res.render("error-login");
  })
  .get("/error-register", (req, res) => {
    res.render("error-register");
  })

  .get("/reset-pass", (req, res) => {
    res.render("reset-pass");
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
  })
  .get("/isAdmin", (req, res) => {
    res.render("isAdmin");
  });

export default router;

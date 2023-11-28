import { Router } from "express";
import passport from "passport";
import { checkAuth } from "../middlewares/isAuth.js";
/* import { checkUserRole } from "../middlewares/checkUserRole.js";
 */
import * as controller from "../controllers/user.controllers.js";

const router = Router();

router
  .post("/register", controller.register)
  .post("/login", controller.login)
  .get("/login", controller.login)
  .get("/register", controller.register)
  .get('/reset-pass', controller.resetPass)
  .post('/reset-pass',controller.resetPass)

router
  .get("/", (req, res) => {
    const { first_name } = req.body;
    res.render("products", { first_name: first_name });
  })

  .get(
    "/profile",
    /* checkUserRole */ checkAuth,
    (req, res) => res.send("profile"),
    controller.profile
  )
  .get(
    "/register-github",
    passport.authenticate("github", { scope: ["user:email"] }),
    controller.githubResponse
    //(req, res) =>{res.send("profile-github")}
    //console.log(req.user) en el req.user tenemos los datos del usuario
  )

  .get(
    "/profile-github",
    passport.authenticate("github", { scope: ["user:email"] }),
    controller.githubResponse
    /* (req, res) => res.send ("Welcome to profile-github")
     */
  )
  /*   .get("/logout", (req, res) => {
    req.logout((err) => {
      if (err) return res.send(err);
      else res.redirect("/login");
    }); */
  .get("/logout", controller.logout)

  /*ruta en el router de api/users, la cual será /api/users/premium/:uid  la cual permitirá cambiar el rol de un usuario, de “user” a “premium” y viceversa.
   */
/*   .get("/premium/:uid", checkUserRole, (req, res) => {}); */

/* }); */

/* Crear un endpoint en el router de usuarios api/users/:uid/documents con el método POST que permita subir uno o múltiples archivos. Utilizar el middleware de Multer para poder recibir los documentos que se carguen y actualizar en el usuario su status para hacer saber que ya subió algún documento en particular.

El middleware de multer deberá estar modificado para que pueda guardar en diferentes carpetas los diferentes archivos que se suban.
Si se sube una imagen de perfil, deberá guardarlo en una carpeta profiles, en caso de recibir la imagen de un producto, deberá guardarlo en una carpeta products, mientras que ahora al cargar un documento, multer los guardará en una carpeta documents. */

/* .post('/:uid/documents ',); */

export default router;

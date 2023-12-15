import { Router } from "express";
import passport from "passport";
import { checkAuth } from "../middlewares/checkAuth.js";
import {checkAdmin} from "../middlewares/checkAdmin.js";

/* import { checkUserRole } from "../middlewares/checkUserRole.js";
 */
import * as controller from "../controllers/user.controllers.js";
import { uploader } from "../utils.js";
import { checkUserRole } from "../middlewares/checkUserRole.js";
import { changeRoleUser } from "../services/user.service.js";

const router = Router();

router
  .get("/", controller.getAll)
  /*     .get("/:id", controller.getById)
   */ .get("/current/dtoUser/:id", controller.getByIdDto)
  .put("/admin/users/:id/edit", checkUserRole, controller.update)
  .delete("/admin/users/:id/delete", checkUserRole, controller.eliminate)
  .post("/register", controller.register)
  .post("/login", controller.login)
  .get("/login", controller.login)
  .get("/register", controller.register)
  .get("/reset-pass", controller.resetPass)
  .post("/reset-pass", checkAuth, controller.resetPass)
  .put("/update-pass", controller.updatePass)
  .post('/add/:pid/quantity/:quantity', checkAuth,checkUserRole, controller.addProdToUserCart);
router
  .get("/", (req, res) => {
    const { first_name } = req.body;
    res.render("products", { first_name: first_name });
  })

  .get(
    "/profile",
    /* checkUserRole */ checkAuth,
    /* (req, res) => res.send("profile"), */
    controller.profile
  )
  .get(
    "/register-github",
    passport.authenticate("github", { scope: ["user:email"] }),
    controller.githubLogin
  )

  .get(
    "/profile-github",
    passport.authenticate("github", {
      failureRedirect: "/api/sessions/login",
      successRedirect: "/api/sessions/profile",
      passReqToCallback: true,
    })
  )

  .get("/logout", controller.logout)
  .get("/current", checkAuth, (req, res) => {
    res.send({ status: "success", payload: req.user });
  })
  /*ruta en el router de api/users, la cual será /api/users/premium/:uid  la cual permitirá cambiar el rol de un usuario, de “user” a “premium” y viceversa.
   */
  /* sólo actualice al usuario a premium si ya ha cargado los siguientes documentos:
   */
  .put("/premium/:uid", checkAdmin, controller.changeRoleUser)

  /* Crear un endpoint en el router de usuarios api/users/:uid/documents con el método POST que permita subir uno o múltiples archivos. Utilizar el middleware de Multer para poder recibir los documentos que se carguen y actualizar en el usuario su status para hacer saber que ya subió algún documento en particular.

El middleware de multer deberá estar modificado para que pueda guardar en diferentes carpetas los diferentes archivos que se suban.
Si se sube una imagen de perfil, deberá guardarlo en una carpeta profiles, en caso de recibir la imagen de un producto, deberá guardarlo en una carpeta products, mientras que ahora al cargar un documento, multer los guardará en una carpeta documents. */
  /* sólo actualice al usuario a premium si ya ha cargado los siguientes documentos:
Identificación, Comprobante de domicilio, Comprobante de estado de cuenta
 */
  /* En caso de llamar al endpoint, si no se ha terminado de cargar la documentación, devolver un error indicando que el usuario no ha terminado de procesar su documentación. 
(Sólo si quiere pasar de user a premium, no al revés)
 */

  .post(
    "/:uid/documents ",
    uploader.fields([
      { name: "profile", maxCount: 1 },
      { name: "product", maxCount: 1 },
      { name: "document", maxCount: 3 },
    ]),
    controller.uploadDocuments
  );

export default router;

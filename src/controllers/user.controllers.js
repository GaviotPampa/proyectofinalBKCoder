import logger from "../middlewares/logger-mw.js";
import UserDao from "../persistence/daos/mongodb/user.dao.js";
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();
import { sendMail } from "./gmail.controllers.js";
const userDao = new UserDao();
import * as service from "../services/user.service.js";

export const getAll = async (req, res, next) => {
  try {
    const items = await service.getAll();
    logger.info("getting all users in controller", items);
    if (!items) return httpResponse.ServerError(res, "No items found ");
    return httpResponse.Ok(res, { data: items });
    /*     createResponse(res, 200, items);
     */
  } catch (error) {
    logger.error("error en user.comtroller ", error);
    next(error.message);
  }
};

export const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await service.getById(id);
    if (!item)
      return httpResponse.NotFound(res, 404, "User not found for id: " + id);
    else httpResponse.Ok(res, item);
  } catch (error) {
    logger.error("error en getById user.controller", error);
    next(error.message);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await service.getById(id);
    if (!item) return httpResponse.NotFound(res, 404, "ERROR_UPDATE");
    else {
      const itemUpd = await service.update(id, req.body);

      HttpResponse.Ok(res, itemUpd);
    }
  } catch (error) {
    next(error.message);
  }
};

export const eliminate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await service.getById(id);
    if (!item)
      createResponse(res, 404, {
        method: "service",
        error: "Item not found",
      });
    else {
      const itemDel = await service.delete(id);
      createResponse(res, 200, itemDel);
    }
  } catch (error) {
    next(error.message);
  }
};

/* CUANDO SE REGISTRE EL USUSARIO SE HACE ENVIO DE MAIL */
export const register = async (req, res) => {
  try {
    const user = req.body;
    const newUser = await userDao.register(user);
    await sendMail(user, "register");
    if (newUser) res.redirect("/api/sessions/login");
    else res.redirect("/api/sessions/error-register");
    logger.error("en el register en user.controllers", newUser);
  } catch (error) {
    logger.error(error);
    throw new Error(error.message);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.login(req.body);
    if (user) {
      req.session.email = email;
      req.session.password = password;
      res.redirect("/api/sessions/profile");
    } else res.redirect("/api/sessions/error-login");
    logger.info("login user.controller ok", user);
  } catch (error) {
    logger.error("login failed user.controller".error);
    next(error);
  }
};

export const githubResponse = (req, res, next) => {
  try {
    const { first_name, last_name, email, isGithub } = req.user;
    res.json({
      msg: "Welcome! Registration/Login GitHub Ok",
      /*  session: req.session, */
      userData: {
        first_name,
        last_name,
        email,
        isGithub,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const profile = (req, res, next) => {
  try {
    const { first_name, email, role } = req.body;
    createResponse(res, 200, {
      first_name,
      email,
      role,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    //cerrar la sesion del usuario
    req.logout();
    // Redirigir al usuario a la página de inicio de sesión
    res.redirect("/api/sessions/login");
    logger.info("logout user.controller ok");
  } catch (error) {
    logger.error("logout failed user.controller".error);
    next(error);
  }
};

export const resetPass = async (req, res, next) => {
  try {
    const user = req.user;
    const tokenResetPass = await userService.resetPass(user);
    if (!tokenResetPass)
      return httpResponse.Unauthorized(res, "Error email reset notification");
    res.cookie("tokenPass", tokenResetPass);
    return httpResponse.Ok(res, { msg: "Pass reset successfully" });
  } catch (error) {
    logger.error("resetPass failed user.controller".error);
    next(error.message);
  }
};

export const uploadDocuments = async (req, res, next) => {
  try {
    /* res.send ({data:" Enviar un document"}); */
    const uid = req.params.uid;
    const user = await service.upload({_id: uid});
    if (!user) {
      return httpResponse.NotFound(res, 404, "NOT_FOUND");
    }
    const files = req.files;
    if (!files.profile || !files.product || !files.document) {
      return res.status(404).send({
        status: "error",
        error: "Please upload all required documents",
      });
    }
    console.log(req.files);
    user.documents = {
      profile: files.profile[0].filename,
      product: files.product[0].filename,
      document: files.document.map((file) => file.filename),
    };
    if (
      user.documents.profile &&
      user.documents.product &&
      user.documents.document.length === 3
    ) {
      user.status = "premium";
      user.profile = req.files.path;
      user.document.push(user);
      await user.save();
    }
    res.send({ status: "succes", message: "Documents uploaded successfully" });
  } catch (error) {
    logger.error("uploadDocuments failed user.controller".error);
    next(error.message);
  }
};

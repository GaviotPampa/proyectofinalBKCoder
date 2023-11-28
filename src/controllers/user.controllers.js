import logger from "../middlewares/logger-mw.js";
import UserDao from "../persistence/daos/mongodb/user.dao.js";
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();
import { sendMail } from "./gmail.controllers.js";
const userDao = new UserDao();

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

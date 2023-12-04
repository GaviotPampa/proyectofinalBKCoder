/* import { UserModel } from "../persistence/daos/mongodb/models/user.model.js";
 */

import logger from "../middlewares/logger-mw.js";

export const register = (req, res) => {
  res.render("register");
  logger.info("Controller views register:", register);
};

export const errorRegister = (req, res) => {
  res.render("errorRegister");
};

export const login = (req, res) => {
  console.log("render login views.controller", req.body);
  res.render("login");
};

export const errorLogin = (req, res) => {
  res.render("errorLogin");
};

export const profile = (req, res) => {
  console.log("render profile views.controller", req.body);
  const user = req.user?.toObject();
  res.render("profile", user);
};

export const products = (req, res) => {
  res.render("realTimeProducts", { users: req.user._id, products });
};

export const chat = (req, res) => {
  res.render("chat");
};

export const home = (req, res) => {
  res.render("home");
};

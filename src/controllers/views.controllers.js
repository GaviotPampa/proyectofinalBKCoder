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

export const githubLogin = (req, res) => {
  res.render("register-github");
};

export const errorLogin = (req, res) => {
  res.render("errorLogin");
};

export const profile = (req, res) => {

  const user = req.user?.toObject();
    console.log("render profile views.controller", req.user);
  res.render("profile", {user: user});
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

export const resetPass = (req, res) => {
  res.render("userRestart");
};

export const isAdmin = (req, res) => {
  res.render("isAdmin");
};
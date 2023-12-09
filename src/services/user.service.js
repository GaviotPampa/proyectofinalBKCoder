import UserDao from "../persistence/daos/mongodb/user.dao.js";
const userDao = new UserDao();
import logger from "../middlewares/logger-mw.js";

import * as service from "../persistence/repositories/user/user.repository.js";

export const getAll = async () => {
  try {
    const items = await userDao.getAll();
    logger.info("getAll user.service", items);
    return items;
  } catch (error) {
    logger.error(error, "error getting all user.service");
  }
};

export const getById = async (id) => {
  try {
    const item = await userDao.getById(id);
    if (!item) return false;
    else return item;
  } catch (error) {
    logger.error("getById en user.service", error);
  }
};

export const update = async (id, obj) => {
  try {
    const item = await userDao.update(id);
    if (!item) return false;
    else return await userDao.update(id, obj);
  } catch (error) {
    logger.error(error);
  }
};

export const eliminate = async (id) => {
  try {
    const item = await this.getById(id);
    if (!item) return false;
    else return await userDao.eliminate(id);
  } catch (error) {
    logger.error(error);
  }
};

export const register = async (user) => {
  try {
    const response = await userDao.register(user);
   return response;
  } catch (error) {
    logger.error(error);
    throw new Error(error.message);
  }
};

export const login = async (req, res) => {
  try {
    if (req.session.user) {
      const user = await userDao.login(req.session.passport.user);
      res.json({
        msg: "Login ok",
        user,
      });
      /* const newSession = await userDao.openSessions ({first_name, last_name, email});
      await newSession.save(); */
      logger.info("login successful user.service", user, newSession);
    } else {
      res.json({ msg: "Login error en user.service" });
    }
  } catch (error) {
    logger.error(error);
  }
};

export const profile = async (req, res) => {
  try {
    res.json({
      msg: "Profile user.service",
      session: req.session,
    });
  } catch (error) {
    logger.error(error);
  }
};

export const githubResponse = async (req, res,next) => {
  try {
    // console.log(req.user)
    const { first_name, last_name, email, isGithub } = req.user;
    res.json({
      msg: "Register/Login Github OK",
      session: req.session,
      userData: {
        first_name,
        last_name,
        email,
        isGithub,
      },
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
export const addCartToUser = async (userId, cartId) => {
  try {
    const cartExists = await userDao.getCartById(cartId);
    const newCart = await userDao.addCartToUser(userId, cartId, true);
    if (!cartExists) throw new Error(`The cart does not exist.`);
    else return newCart;
  } catch (error) {
    console.log(error.message);
  }
};

export const getByIdDto = async (id) => {
  try {
    const user = await service.getByIdDto(id);
    if (!user) return false;
    else return user;
  } catch (error) {
    logger.error(error);
  }
};

export const resetPass = async (user) => {
  try {
    const token = await userDao.resetPass(user);
    if (!token) return false;
    return await sendMail(user, "resetPass", token);
  } catch (error) {
    logger.error(" en user service resetPass", error);
    throw new Error(error.message);
  }
};

export const updatePass = async (user, password) => {
  try {
    await userDao.updatePass(user, password);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const upload = async (id) => {
  try {
    const item = await userDao.upload(id);
    if (!item) return false;
    else return item;
  } catch (error) {
    logger.error(error);
  }
};

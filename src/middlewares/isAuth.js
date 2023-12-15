/* retorna true o false si el usuario esta autenticado o no */
import logger from "./logger-mw.js";
export const isAuth = (req, res, next) => {
  logger.info(req.session.passport.user);
  logger.error(req.isAuthenticated());
  if (req.isAuthenticated()) return req.user = user;
  next();
  res.status(401).send({ msg: "Unauthorized" });
};

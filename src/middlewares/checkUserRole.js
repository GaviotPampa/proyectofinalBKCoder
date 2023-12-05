
import userDao from '../persistence/daos/mongodb/user.dao.js';
import logger from './logger-mw.js';

//--->request --->MIDDLEWARE --->ENDPOINT
export const checkUserRole= async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) return res.status(401).json({ msg: "Unauthorized" });
    const user = await userDao.getById(user._id);
    if (!user) return res.status(400).json({ msg: "Usuario no encontrado: No tienes permiso para acceder, Unauthorized!" });
    const userRole = user.role;
    logger.info("info chekRole ",userRole);
    if(userRole !== 'admin') return res.status(403).json({ msg: 'No user admin'});
    else next();
    if(userRole === 'user') return res.status(200).json({ msg: 'User acces authenticated'});
    if(userRole === 'premium') return res.status(200).json({ msg: 'User Premium access'});
    next();
  } catch (err) {
    logger.error(err);
    return res.status(401).json({ msg: "Unauthorized" });
  }
};
import jwt from 'jsonwebtoken';
import UserDao from "../persistence/daos/mongodb/user.dao.js";
const userDao = new UserDao();
import config from "../config/config.js";

const SECRET_KEY = config.SECRET_KEY_JWT;

export const checkAdmin = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) return res.status(401).json({ msg: "Unauthorized" });
    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, SECRET_KEY);
    const user = await userDao.getById(decode.userId);
    if (!user) return res.status(400).json({ msg: "Unauthorized" });
    const userRole = user.role;
    console.log(userRole);
    if(userRole !== 'admin') return res.status(403).json({ msg: 'No user admin'});
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "Unauthorized" });
  }
};
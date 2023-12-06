import { UserModel } from "./models/user.model.js";
import { createHash, isValidPassword } from "../../../utils.js";
import config from "../../../config/config.js";
import jwt from 'jsonwebtoken';
import logger from "../../../middlewares/logger-mw.js";

export default class UserDao {

  
  async getAll() {
    try {
      const response = await UserModel.find({});
      logger.info("response en user.dao",response);
      return response;
    } catch (error) {
      logger.error("error en user.dao"+ error);
    }
  }


  async update(id, obj) {
    try {
      await this.updateOne({ _id: id }, obj);
      return obj;
    } catch (error) {
      logger.error(error);
    }
  }

  async eliminate(id) {
    try {
      const response = await this.findByIdAndDelete(id);
      return response;
    } catch (error) {
      logger.error(error);
    }
  }
  async register(user) {
    try {
      const { email, password } = user;
      /*  const existUser = await UserModel.findOne(email); */
      const existUser = await this.getByEmail(email);
      logger.info("logger info existUser en user.dao:", existUser);
      if (!existUser) {
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
          return await UserModel.create({
            ...user,
            password: createHash(password),
            role: "admin",
          });
        }
        return await UserModel.create({
          ...user,
          password: createHash(password),
        });
      } else return false;
    } catch (error) {
      logger.error("en el register user.dao", error);
      throw new Error(error);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await this.getByEmail(email);
      if (userExist) {
        const passValid = isValidPassword(password, userExist);
        console.log("PASSValid in login user.dao:", passValid);
        if (!passValid) return false;
        else return this.generateToken (userExist, '15m');
      }
      return false;
    } catch (error) {
      logger.error("error en login user.dao", error);
    }
  }

  async getById(id) {
    try {
      const userExist = await UserModel.findById({ _id: id });
      console.log(userExist);
      if (userExist) {
        return userExist;
      }
      return false;
    } catch (error) {
      logger.error(error);
      throw new Error(error);
    }
  }

  async getByEmail(email) {
    try {
      const userExist = await UserModel.findOne({ email});
      console.log(userExist);
      if (userExist) {
        return userExist;
      }
      return false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async profile(email) {
    try {
      const userExist = await UserModel.findOne({ email });
      console.log(userExist);
      if (userExist) {
        return userExist;
      }
      return false;
    } catch (error) {
      throw new Error(error);
    }
  }
/**
 * Genera el Token del usuario
 * @param {*} user 
 * @param {*} timeExp tiempo de expiración
 * @returns token
 */
  async generateToken(user, timeExp) {
    const payload = {
      userId: user._id,
    };
    const token = jwt.sign(payload, config.SECRET_KEY_JWT, {
      expiresIn: timeExp,
    });
    return token;
  }

  async resetPass(user) {
    try {
      const { email } = user;
      const userExist = await this.getByEmail(email);
      if (!userExist) return false;
      return generateToken(userExist, "1h");
    } catch (error) {
      throw new Error(error);
    }
  }
}

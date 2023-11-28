/* npm i passport-github2 */
import config from "../config/config.js";
import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import logger from "../middlewares/logger-mw.js";
import UserDao from "../persistence/daos/mongodb/user.dao.js";
const userDao = new UserDao();

const strategyOptions = {
  clientID: config.GITHUB_LOCAL_ID,
  clientSecret: config.GITHUB_LOCAL_CLIENTSECRET,
  callbackURL: "http://localhost:8080/api/users/profile-github",
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  try {
    logger.info("PROFILE github --> ", profile);
    const email =
      profile._json.email !== null ? profile._json.email : profile._json.blog;
    const user = await userDao.getByEmail(email);
    if (!user) {return done (null, false)}
    if (user) return done(null, user);
    const newUser = await userDao.register({
      first_name:
        profile._json.name.split(" ")[0] + " " +profile._json.name.split(" ")[1]
          ? profile._json.name.split(" ")[0]
          : "",
      last_name:
        profile._json.name.split(" ")[2] + profile._json.name.split(" ")[3]
          ? profile._json.name.split(" ")[2]
          : "",
      email: profile._json.email,
      password: "",
      isGithub: true,
    });
    return done(null, newUser);
  } catch (error) {
    done(error);
    logger.error("error en Github.strategy:",error);
  }
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));

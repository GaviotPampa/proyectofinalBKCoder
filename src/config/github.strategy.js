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
    if (user)return done (null,user);
    const fullName = profile._json.name;
    const parts = fullName.split(' '); 
    let lastName = '';
    parts.length > 1 ? lastName = parts.slice(2).join(' ') : lastName = parts[0]; 
    const newUser = await userDao.register({
        first_name: profile._json.name.split(' ').slice(0, 2).join(' '),
        last_name: lastName,
        email,
        password: '',
        isGithub: true,
        image: profile._json.avatar_url
    });
    return done(null, newUser);
  } catch (error) {
    logger.error("error en Github.strategy:", error);
    return done(error);
  }
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));

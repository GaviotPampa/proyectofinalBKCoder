import UserDaoMongoDB from "../persistence/daos/mongodb/user.dao.js";
const userDao = new UserDaoMongoDB();

export const register= async (req, res, next)=>{
  try {
    res.json({
      msg: 'Register ok',
      session: req.session 
    });
  } catch (error) {
    next(error.message)
  }
}  

export const login = async(req, res, next)=>{
  try {
    if (req.session.user) {
      const user = await userDao.getById(req.session.user);
      res.json({
        msg: 'Login ok',
        user
      
      })
    } else {
      res.json ({msg: 'Login error'})
    }

    console.log(user);
  } catch (error) {
    next(error.message)
  }
}  
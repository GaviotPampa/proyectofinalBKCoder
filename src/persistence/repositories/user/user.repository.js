/* clase que recibe el DAO con un metodo nuevo donde se aplica el DTO , metodo que se aplica en servicio*/

import UserResDto from "../../dtos/userDto/user.res.dto.js";
import UserDaoMDB from "../../daos/mongodb/user.dao.js";
const userDao = new UserDaoMDB();

export const  getByIdDTO = async(id) =>{
        try {
          /*   const response = await userDao.getByIdDto(id);
            return new UserResDTO(response); */
            const userDto = new UserResDto(id);
            return await userDao.getByIdDTO(userDto);
        } catch (error) {
            console.log(error);
        }
    }

 
/* clase que recibe el DAO con un metodo nuevo donde se aplica el DTO , metodo que se aplica en servicio*/

import {UserDao} from "../../daos/mongodb/models/user.model.js";

export default class Userrepository {
    async getByIdDTO(id){
        try {
            const response = await UserDao.getById(id);
            return new ProductResDTO(response);
        } catch (error) {
            console.log(error);
        }
    }
}

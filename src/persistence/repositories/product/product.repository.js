import ProdReqDTO from "../../dtos/productDto/product.req.dto.js";
import ProdResDto from "../../dtos/productDto/product.res.dto.js";
import logger from "../../../middlewares/logger-mw.js";
import ProdDaoMDB from "../../daos/mongodb/product.dao.js";
const prodDao = new ProdDaoMDB();

/* export default class ProductRepository {
  constructor() {
    this.dao = ProdDaoMDB;
  } */

  export const  getByIdDto = async(id)=> {
    try {
      /* const prodDTO =  await prodDao.getById(id); 
         const resDto = new ProdResDto(prodDTO);
      return*/
      const prod = await prodDao.getByIdDto(id);
      return new ProdResDto (prod);

    } catch (error) {
      logger.error(error);
    }
  }

  export const  createProd = async (obj) =>{
    try {
      const prodDTO = new ProdReqDTO(obj);
      return await prodDao.create(prodDTO);
    } catch (error) {
      logger.error(error);
    }
  }


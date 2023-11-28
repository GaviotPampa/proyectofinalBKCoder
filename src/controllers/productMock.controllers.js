import * as prodMockService from "../services/productMock.service.js";

export const createProductsMock = async (req,res) =>{
    try {
        const {cant} = req.query;
        const response = await prodMockService.createProductsMock(cant)
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}


export const getProductsMock= async (req, res) => {
    try {
     const response = await prodMockService.getProductsMock()
     res.json(response)
    } catch (error) {
      console.log(error);
    }
  };
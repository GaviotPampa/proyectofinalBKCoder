//desde controllers llamamos a los servicios

//en controlllers manejamos lo que requerimos del usuario y lo que le respondemos

/* Se deberá poder buscar productos por categoría o por disponibilidad, y se deberá poder realizar un ordenamiento de estos productos de manera ascendente o descendente por precio. */

/* Método GET / que cumpla con los siguientes puntos:
Deberá poder recibir por query params un limit (opcional), una page (opcional), un sort (opcional) y un query (opcional)
-limit permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10.
page permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta será de 1
 */
/*query, el tipo de elemento que quiero buscar ( qué filtro aplicar), en caso de no recibir query, realizar la búsqueda general
sort: asc/desc, para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir sort, no realizar ningún ordenamiento
  */

import * as service from "../services/product.service.js";
import logger from "../middlewares/logger-mw.js";
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();

export const getAllProd = async (req, res, next) => {
  try {
    const response = await service.getAllProdServ();
    if (!response) return httpResponse.ServerError(res, "Not Found Products");
    return httpResponse.Ok(res, { data: response });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const productId = req.params.pid;
    const product = await service.getById(productId);
    if (!product)
      return httpResponse.NotFound(
        res,
        "Product not found by pid " + productId
      );
    else httpResponse.Ok(res, product);
  } catch (error) {
    logger.error("Error en la busqueda de producto por ID");
    next(error.message);
  }
};

export const getByIdDto = async (req, res, next) => {
  try {
    const prodId = req.params.pid;
    const product = await service.getByIdDto(prodId);
    console.log(product);
    if (!product)
      return httpResponse.NotFound(res, "Product not found by pid " + id);
    else httpResponse.Ok(res, product);
  } catch (error) {
    logger.error(
      "Error en la busqueda de producto por ID en product.controller. "
    );
    next(error.message);
  }
};
/* 
export const createProd = async (req, res, next) => {
  try {
    
    const newProduct = await service.create(req.body);
    logger.info(newProduct);
    if (newProduct) {
      httpResponse.Ok(res, newProduct);
      logger.info("Product created successfully whit mongoose");
      return newProduct;
    } else { */
/* res.status(404).json({ message: "Validation error" }); */
/* httpResponse.BadRequest(res, "Validation error");
res.status(200).json
   }
  } catch (error) {
    logger.debug("Error creating product");
    next(error);
  }
}; */

export const createProdDto = async (req, res, next) => {
  try {
    const newProd = await service.createProdDto(req.body);
    if (!newProd) return httpResponse.NotFound(res, httpResponse.NOT_FOUND);
    else return httpResponse.Ok(res, newProd);
  } catch (error) {
    logger.debug("Error creating product");
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { pid } = req.params;
    console.log("pid:",pid);
    const prod = await service.getById(pid);
    console.log("prod:",prod);
    if (!prod) return httpResponse.NotFound(res, "ERROR_UPDATE");
    const prodUpd = await service.updateProd(pid, req.body);
    return httpResponse.Ok(res, prodUpd);
  } catch (error) {
    logger.error("en product controller", error);
    next(error.message);
  }
};

export const addProdToCart = async (req, res, next) => {
  try {
    const { idCart } = req.params;
    const { idProduct } = req.params;
    const { quantity } = req.params;
    const newProdCart = await service.addProdToCart(
      idProduct,
      idCart,
      Number(quantity)
    );
    const user = req.body.user;
    const product = req.body.product;
    if (newProdCart && user === user) {
      create(newProdCart);
    }
    if (newProdCart  && product.owner === user.id) {
      // Agrega el producto al carrito.
      logger.info(`El producto ${idProduct} fue agregado al carrito`);
      create(res, 200, newProdCart);
    } else {
      logger.info("No puedes agregar este producto a tu carrito.");
    }
    /*    if (!newProdCart) {
      httpResponse.BadRequest(res, "No se encuentra el producto.");
    } else {
      logger.info(`El producto ${idProduct} fue agregado al carrito`);
      create(res, 200, newProdCart);
    } */

    /*  for(let i =0; i <newProdCart.length; i++) */
  } catch (error) {
    next(error.message);
  }
};
export const expunge = async (req, res, next) => {
  try {
    const { id } = req.params;
    const itemDel = await service.deleteServ(id);
    res.json(itemDel);
    if (!itemDel) return httpResp.NotFound(res, "ERROR_DELETE");
    return httpResp.Ok(res, "Product deleted successfully");
  } catch (error) {
    next(error.message);
  }
};

export const getPaginate = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const response = await service.getProdPaginateServ(page, limit);
    res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

/* El método GET deberá devolver un objeto con el siguiente formato:
{
	status:success/error
payload: Resultado de los productos solicitados
totalPages: Total de páginas
prevPage: Página anterior
nextPage: Página siguiente
page: Página actual
hasPrevPage: Indicador para saber si la página previa existe
hasNextPage: Indicador para saber si la página siguiente existe.
prevLink: Link directo a la página previa (null si hasPrevPage=false)
nextLink: Link directo a la página siguiente (null si hasNextPage=false)
} */

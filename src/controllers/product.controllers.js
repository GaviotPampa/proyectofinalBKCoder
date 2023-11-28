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

export const getByIdDto= async (req, res, next) => {
  try {
    const productId = req.params.pid;
    const product = await service.getByIdDto(productId);
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

/* export const create = async (req, res, next) => {
  try {
    const { ...obj } = req.body;
    if (
      !obj.title ||
      obj.title == undefined ||
      obj.title == null ||
      obj.title == ""
    )
      httpResponse.BadRequest(
        res,
        "Title are required, el campo titulo es obligatorio"
      );
    if (
      !obj.description ||
      obj.description == undefined ||
      obj.description == null ||
      obj.description == ""
    )
      httpResponse.BadRequest(res, "Description are required");
    if (
      !obj.price ||
      obj.price == undefined ||
      obj.price == null ||
      obj.price == ""
    )
      httpResponse.BadRequest(res, "Price are required");
    if (
      !obj.stock ||
      obj.stock == undefined ||
      obj.stock == null ||
      obj.stock == ""
    )
      httpResponse.BadRequest(res, "Stock are required");
    if (
      !obj.code ||
      obj.code == undefined ||
      obj.code == null ||
      obj.code == ""
    )
      httpResponse.BadRequest(res, "Code are required");
    if (
      !obj.status ||
      obj.status == undefined ||
      obj.status == null ||
      obj.status == ""
    )
      httpResponse.BadRequest(res, "Status are required");
    if (
      !obj.category ||
      obj.category == undefined ||
      obj.category == null ||
      obj.category == ""
    )
      httpResponse.BadRequest(res, "Category are required");
    const newProduct = await service.createServ(req.body);
    logger.info(newProduct);
    if (newProduct && obj.status === true) {
      httpResponse.Ok(res, newProduct);
      logger.info("Product created successfully whit mongoose");
      return newProduct;
    } else { */
/* res.status(404).json({ message: "Validation error" }); */
/* httpResponse.BadRequest(res, "Validation error"); */
/* res.status(200).json */
/*    }
  } catch (error) {
    logger.debug("Error creating product");
    next(error);
  }
}; */

export const createProdDTO = async (req, res,next) => {
  try {
    const newProd = await service.createProd(req.body);
    if(!newProd) return httpResponse.NotFound(res, httpResponse.NOT_FOUND);
    else return httpResponse.Ok(res, newProd);
  } catch (error) {
    logger.debug("Error creating product");
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prodUpd = await service.updateProd(id, req.body);
    res.json(prodUpd);
    if (!prodUpd) return httpResp.NotFound(res, "ERROR_UPDATE");
    return httpResp.Ok(res, prodUpd);
  } catch (error) {
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
    if (newProdCart && user.isPremium && product.owner === user.id) {
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

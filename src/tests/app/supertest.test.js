import app from "../../server.js";
import mongoose from "mongoose";
import chai from "chai";
import { describe } from "mocha";
import supertest from "supertest";
///chai servirá para hacer las pruebas a partir de expect, el cual declaramos en la línea 6
///supertest puede generar un requester. Este requester de la línea 7 será el encargado de realizar las peticiones al servidor.
const expect = chai.expect;
const requester = supertest("http://localhost:8080/");

describe("testing Api", () => {
  before(async () => {
    await mongoose.connection.collections["products"].drop();
  });
  test("El endpoint POST /api/products debe crear un product correctamente", async () => {
    const productMock = {
      title: "Product1",
      price: "3000",
    };
    const { statusCode, ok, _body } = await requester(app)
      .post("/api/products")
      .send(productMock);
    expect(_body.payload).to.have.property("_id");
    const id = response.body._id;
    const titleResponse = response.body.title;
    expect(response.statusCode).toBe(200);
    expect(id).toBeDefined();
    expect(response.body).toHaveProperty('_id');
    expect(titleResponse).toBe(productMock.title)
    console.log(statusCode);
    console.log(ok);
    console.log(_body);
  });
});
///algunas de las propiedades que podemos obtener de la respuesta del requester son:
/* Statuscode: Código del status.
Ok: Si el status corresponde a un valor ok (es igual para Redirected, unauthorized, forbidden, etc)
_body: Permite obtener el cuerpo de la respuesta (podemos ver el status y el payload en la consola) */
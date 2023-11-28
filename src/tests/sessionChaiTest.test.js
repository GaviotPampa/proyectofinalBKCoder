import mongoose from "mongoose";
import chai from "chai";
import { describe } from "mocha";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080/");

mongoose.connect("mongodb://localhost:8080");

describe("Testing Sessions Avanzado", () => {
  let cookie;
  before(async () => {});
  it("Test 1: Debe registrar correctamente un usuario", async () => {
    const mockUser = {
      first_name: "John",
      last_name: "Connor",
      email: "john@mail.com",
      password: "1234",
    };
    const { _body } = await requester
      .post("/api/sessions/register")
      .send(mockUser);
    expect(_body.payload).to.be.ok;
  });
  it("Test 2: Debe loguear correctamente al usuario", async () => {
    const mockUser = {
      email: "john@mail.com",
      password: "1234",
    };
    const result = await requester.post("/api/sessions/login").send(mockUser);
    const cookieResult = result.headers["set-Cookie"][0];
    expect(cookieResult).to.be.ok;
    cookie = {
      name: cookieResult.split("=")[0],
      value: cookieResult.split("=")[1],
    };
    expect(cookie.first_name).to.be.ok.and.eql("coderCookie");
    expect(cookie.value).to.be.ok;
  });
  it("Test 3: Debe enviar la cookie que contiene el usuario y destructurar este correctamente", async() => {
    const {_body} = (await requester.get('/api/sessions/current')).set('Cookie',[`${cookie.first_name}+${cookie.value}`]);
    expect(_body.payload.email).to.be.eql('john@mail.com');
  });
  it("nombre de la prueba de session", () => {
    const objeto = {};
    expect(objeto).to.be.empty;
  });
  it("debería devolver verdadero si la matriz está vacía", function () {
    const matriz = [];
    expect(matriz).to.be.empty;
  });
  /* it("", () => {}); */
});

import mongoose from "mongoose";
import ProdDaoMDB from "../persistence/daos/mongodb/product.dao.js";
import { assert, expect } from "chai";
import config from "../config/config.js";
import { after, it } from "mocha";
import logger from "../middlewares/logger-mw.js";

//inicializamos la conexión de mongoose para este flujo de pruebas

//se utilizara la variable expect para hacer las comparaciones

/* const expect = chai.expect; */

mongoose.connect({ mongoUrl: config.MONGO_ATLAS_URL });

describe("Testing Products Dao con chai", function () {
  this.timeout(10000); //override default timeoutfor 2000ms to 10000ms
  let productDao;
  before(async () => {
    productDao = new ProdDaoMDB();
  });
  it("Test 1: El Dao debe obtener todos los products", async () => {
    const productDao = new ProdDaoMDB();
    console.log(productDao);
    const result = await productDao.getAllProd();
    expect(Array.isArray(result)).to.be.equal(true);
    expect(result).to.be.equal;
  });

  it("Test 2: El Dao de producto debe crear un producto correctamente a la base de datos", async () => {
    const productDao = new ProdDaoMDB();

    let mockProduct = [
      {
        marca: "product mock 1",
        description: "Product mock 1 test",
        importe: 3000,
        codigo: "oct23",
        status: true,
        stock: 5,
        categoria: "accessories",
      },
    ];
    const result = await productDao.createProd(mockProduct);
    const res = await productDao.getAllProd();
    expect(res).to.have.length(1);
    expect(result).to.have.property("_id");
    expect(result.marca).to.have.equal(mockProduct.marca);
    expect(typeof mockProduct.body === "string").to.be.equal(true);
    assert.deepEqual(result, mockProduct);
  });
  xit("Test 3: GetById deberia mostrar un producto por su Id", async () => {
    let mockProduct = [
      {
        marca: "product mock 2",
        description: "Product mock 2 test",
        importe: 3000,
        codigo: "oct2823",
        status: true,
        stock: 5,
        categoria: "accessories",
      },
    ];
    const result = await productDao.createProd(mockProduct);
    const resultString = result._id.toString();
    const searchResult = await result.getById(result._id);
    expect(searchResult._id.toString()).toEqual(resultString);
    expect(result).to.not.be.null;
    /*     expect(result).to.have.property('_id');
     */ expect(result).to.have.length(1);
    expect(result).to.be.equal(mockProduct.marca);
    expect(result.codigo).to.be.equal(mockProduct.codigo);
    expect(result.categoria).to.be.equal(mockProduct.categoria);
    expect(typeof mockProduct.body === "object").to.be.equal(true);
  });

  it("Test 4: Test que evalúe que el método update del Dao de product sea efectivo", async () => {
    const mockProduct = {
      marca: "product mock ",
      description: "Product mock test",
      importe: 3000,
      codigo: "oct2823",
      status: true,
      stock: 5,
      categoria: "accessories",
      owner: "admin",
    };

    const mockProduct2 = {
      marca: "product mock 2",
      description: "Product mock 2 test modified",
      importe: 5000,
      codigo: "oct2923",
      status: true,
      stock: 7,
      categoria: "accessories",
      owner: "admin",
    };

    const result = await productDao.createProd(mockProduct);
    const upResult = await productDao.updateProd(result._id, mockProduct2);
    expect(upResult).to.be.ok;
    expect(upResult).to.be.equal(mockProduct2.marca);
    expect(upResult).to.be.equal(mockProduct2.description);
    expect(upResult).to.be.equal(mockProduct2.importe);
    expect(upResult).to.be.equal(mockProduct2.codigo);
    expect(upResult).to.be.equal(mockProduct2.status);
    expect(upResult).to.be.equal(mockProduct2.stock);
    expect(upResult).to.be.equal(mockProduct2.categoria);
  });

  it("Test 5: Test que evalua que el método delete del Dao de product sea efectivo", async () => {
    const mockProduct2 = {
      marca: "product mock 2",
      description: "Product mock 2 test modified",
      importe: 5000,
      codigo: "oct2923",
      status: true,
      stock: 7,
      categoria: "accessories",
      owner: "admin",
    };
    const result = await productDao.createProd(mockProduct2);
    console.log(result);
    const deleteRes = productDao.deleteProd();
    assert.equal(result._id);
    expect(deleteRes).to.be.equal(mockProduct2.marca);
    expect(deleteRes).to.be.equal(mockProduct2.description);
    expect(deleteRes).to.be.equal(mockProduct2.importe);
    expect(deleteRes).to.be.equal(mockProduct2.codigo);
    expect(deleteRes).to.be.equal(mockProduct2.status);
    expect(deleteRes).to.be.equal(mockProduct2.stock);
    expect(deleteRes).to.be.equal(mockProduct2.categoria);
  });

  beforeEach(function () {
    mongoose.connection.collections["products"].drop();
    logger.info("se limpio la coleccion de productsTest");
  });

  after(() => {
    logger.info("Finalizaron los tests de la coleccion de productsTest");
  });
});

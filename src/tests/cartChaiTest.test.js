import chai from "chai";
import mongoose from "mongoose";
import CartDaoMDB from "../persistence/daos/mongodb/cart.dao.js";
import { before } from "mocha";

const expect = chai.expect;

mongoose.connect('mongodb://localhost:8080')

//Recordando la arquitectura:
/* describe define el significado del test. */
/* 
before sirve para ejecutarse antes de iniciar todo el flujo de testing, en este caso lo utilizamos para inicializar el Dao de usuarios.
beforeEach se ejecuta antes de cada test, de manera que lo utilizamos para limpiar la colección y para setear un tiempo máximo de resolución (porque estamos trabajando con bases de datos)
 */

describe('sets de tests del carrito con Chai', ()=>{
    let cartDao;
    before(async()=>{
        cartDao = new CartDaoMDB();
    })
    it('El Dao debe obtener el carrito en formato de arreglo', async () => {
        const cartDao = new CartDaoMDB();
        console.log(cartDao);
        const result = await cartDao.getAllCarts();
        assert.strictEqual(Array.isArray(result), true);
    });


})

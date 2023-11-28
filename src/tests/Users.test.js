import mongoose from "mongoose";
import UserDao from "../persistence/daos/mongodb/user.dao.js";
import Assert from 'assert';
import logger from "../middlewares/logger-mw.js";

/* npm i -D mocha chai */
//inicializamos la conexión de mongoose para este flujo de pruebas y configuramos Assert de nodejs para poder evaluar los tests en strict mode

mongoose.connect('mongodb://localhost:8080')

const assert = Assert.strict;

describe('Testing Users Dao', () => {
    let userDao;
    before(async()=> {
        userDao = new UserDao();
        await mongoose.connection.collections.users.drop();
        logger.info('se limpio la coleccion de userTest');
    })
    it('El Dao debe obtener los usuarios en formato de arreglo', async() => {
        console.log(userDao);
        const result = await userDao.getAll();
        assert.strictEqual(Array.isArray(result), true);
        assert.equal(result.length ===0, true);
    });
 

})
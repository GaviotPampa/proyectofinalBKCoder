import { dirname } from 'path';
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));
import MongoStore from 'connect-mongo';
import './persistence/daos/mongodb/db/dbConnection.js';

import {hashSync, compareSync, genSaltSync} from "bcrypt";


/**
 * Método para recibir password y retornar la password hasheada
 * @param {*} password string
 * @returns password hasheada -> string
 * @example
 * createHash ('1234)
 */

export const createHash = password => hashSync(password, genSaltSync (10));

/**
 * Metodo que compara la password hasheada con la de login
 */
export const isValidPassword = ( password, user ) => compareSync (password, user.password);

export const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://Gavi:zoela131@cluster0.9oharja.mongodb.net/ecommerce?retryWrites=true&w=majority",
        crypto: {
            secret: "1234",
        }
    }),
    secret: "1234",
    resave: false,//guarda la sesion aunque no se haya utilizado
    saveUninitialized: false,//crea ka sesion vacio
    cookie: {
        maxAge: 1000 * 30
    }
};
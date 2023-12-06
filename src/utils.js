import { dirname } from "path";
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));
import MongoStore from "connect-mongo";
import "./persistence/daos/mongodb/db/dbConnection.js";
import multer from "multer";

import { hashSync, compareSync, genSaltSync } from "bcrypt";

/**
 * Método para recibir password y retornar la password hasheada
 * @param {*} password string
 * @returns password hasheada -> string
 * @example
 * createHash ('1234)
 */

export const createHash = (password) => hashSync(password, genSaltSync(10));

/**
 * Metodo que compara la password hasheada con la de login
 */
export const isValidPassword = (password, user) =>
  compareSync(password, user.password);

export const mongoStoreOptions = {
  store: MongoStore.create({
    mongoUrl:
      "mongodb+srv://Gavi:zoela131@cluster0.9oharja.mongodb.net/ecommerce?retryWrites=true&w=majority",
    crypto: {
      secret: "1234",
    },
  }),
  secret: "1234",
  resave: false, //guarda la sesion aunque no se haya utilizado
  saveUninitialized: false, //crea ka sesion vacio
  cookie: {
    maxAge: 1000 * 30,
  },
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "profile") {
      cb(null,  __dirname + "/public/uploads/profiles/");
    } else if (file.fieldname === "product") {
      cb(null,  __dirname + "/public/uploads/products/");
    } else {
      file.fieldname === "document";
      cb(null, __dirname + "/public/uploads/documents");
    }
/*     cb(null, __dirname + "/public/uploads");
 */  },
  filename:  (req, file, cb) =>{
    const fileExtension = path.extname(file.originalname);
    const fileName = file.originalname.split(fileExtension)[0];
    cb(null, `${fileName} + "." + ${Date.now()}${fileExtension}`);
    console.log(filename);
  },
});

export const uploader = multer({ storage: storage });

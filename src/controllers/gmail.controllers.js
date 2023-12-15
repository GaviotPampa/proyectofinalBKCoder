import { transporter } from "../services/gmail.service.js";
import config from "../config/config.js";
import logger from "../middlewares/logger-mw.js";

export const sendGmail = async (req, res, next) => {
  try {
    const { dest, name } = req.body;
    const gmailOptions = {
      from: config.EMAIL_GMAIL,
      to: dest,
      subject: "🤩Your first message whit NM!",
      html: `<h1>Hi ${name}, welcome </h1>
             <p> ¡Esto es un test🐱‍🚀, un correo de prueba de implementación de mailing!</p>`,
      attachments: [],
    };
    const response = await transporter.sendMail(gmailOptions);
    logger.info("Sent mail");
    res.json(response);
  } catch (error) {
    next(error);
  }
};

/* funcion reutilizable para registro y restablecimiento de contraseña */
/* en el registro no se utiliza el token */

const createMsgRegister = (first_name) => {
  return `<h1>Hola 🎄 ${first_name}, ¡Bienvenido! </h1>
  <br>
 <p style=" font-size: 18px;"> Puedes ingresar aquí para loguearte</p>
 <a href="http://localhost:8080/api/sessions/login"><strong style="color: green; font-size: 18px;">Login</strong></a>`;
};

const createMsgReset = (first_name) => {
  return `<h1>Hola ${first_name} 👋 </h1>. <p style=" font-size: 18px;">Recibiste este correo porque solicitaste recuperar la contraseña de tu cuenta.
  <br>
  Tocá el siguiente botón <a href="http://localhost:8080/api/sessions/reset-pass">Restablecer contraseña</a> para crear una nueva. Si no lo pediste, podés ignorar este mensaje.
  </p>

 `;
};

export const sendMail = async (user, service, token = null) => {
  try {
    const { first_name, email } = user;
    let msg = "";
    service === "register"
      ? (msg = createMsgRegister(first_name))
      : service === "resetPass"
      ? (msg = createMsgReset(first_name))
      : service === "lastLogin"
      ? (msg = createMsgLastLogin(first_name))
      : (msg = "contenido del correo electrónico");

    let subj = "";
    subj =
      service === "register"
        ? `Bienvenido:  ${first_name} `
        : service === "resetPass"
        ? "Restablecimiento de contraseña"
        : service === "lastLogin"
        ? "Usuario eliminado por inactivo"
        : "";

    const gmailOptions = {
      from: config.EMAIL_GMAIL,
      to: email,
      subject: subj,
      html: msg,
    };

    const response = await transporter.sendMail(gmailOptions);
    if (token !== null) return token;
    console.log("Email sent" + response);
  } catch (error) {
    throw new Error(error.message);
  }
};

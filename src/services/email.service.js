import { createTransport } from "nodemailer";
import { templateHtml } from "./templateHtml.js";
import config from "../config/config.js";

export const transporter = createTransport ({
    host: config.HOST_ETHEREAL,
    port: config.PORT_ETHEREAL,
    auth: {
        user: config.EMAIL_ETHEREAL,
        pass: config.PASSWORD_ETHEREAL
    }
})

/* plantilla de email STRIPO stripo.email */

export const mailOptions = {
    from: config.EMAIL_ETHEREAL,
    to: config.EMAIL_ETHEREAL,
    subject: 'Hola',
    html: templateHtml,
    text: 'Hello, ',
    attachments: [
       /*  {
            path: process.cwd() + '/',
            filename: ` Adjunto a ${process.emv.EMAIL_ETHEREAL} `
        } */
    ]
}
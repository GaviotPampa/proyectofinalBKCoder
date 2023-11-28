import {createTransport} from 'nodemailer';
import config  from '../config/config.js';

export const transporter = createTransport ({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: config.EMAIL_GMAIL,
        pass: config.PASSWORD_NODEMAILER
    }
})


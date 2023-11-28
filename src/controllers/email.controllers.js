import { mailOptions, transporter } from "../services/email.service.js";

export const sendMailEthereal = async (req, res) => {
  try {
    const response = await transporter.sendMail(mailOptions);
    res.json(response);
    console.log("Mail sent");
  } catch (error) {
    console.log(error);
  }
};

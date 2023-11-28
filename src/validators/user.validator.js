import Joi from "joi";

const registerSchema = Joi.object({
  first_name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  last_name: Joi.string()
    .required(),
  email: Joi.string()
    .email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  age: Joi.number()
    .required(),
  password: Joi.string()
    .required()
    .alphanum()
    .required()
    .min(3)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .messages({
      "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
      "string.empty": `Password cannot be empty`,
      "any.required": `Password is required`,
    }),
  role: Joi.string()
    .required(),
});

/* funcion que valida el schema y se pasa  a la ruta */

export const validateRegister = (req,res, next) => {
    const {error} = registerSchema.validate (req.body, {abortEarly: false});
    error?res.status(403).send(error) : next()
}
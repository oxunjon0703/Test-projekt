const Joi = require("joi");

const userRegisterSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
  fullName: Joi.string().required(),
  birthdate: Joi.string(),
  role: Joi.string().required(),
  fileId: Joi.string().required(),
});

const userLoginSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { userRegisterSchema, userLoginSchema };

const Joi = require("joi");

const questionSchema = Joi.object({
  title: Joi.string().required(),
});

module.exports = { questionSchema };

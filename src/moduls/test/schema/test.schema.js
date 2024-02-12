const Joi = require("joi");

const testSchema = Joi.object({
  title: Joi.string().required(),
});

module.exports = { testSchema };

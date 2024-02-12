const joi = require("joi");

const FileSchema = joi.object({
  originalName: joi.string().required(),
});

module.exports = { FileSchema };

const { ResData } = require("../../lib/resData.js");
const { FileException } = require("./exseption/files.exseption.js");
const { FileSchema } = require("./validatsiya/file.schema.js")

class FilesController {
  #fileService;
  constructor(fileService) {
    this.#fileService = fileService;
  }

  async create(req, res) {
    try {
      const dto = req.body;
      const file = req.file;

      const validated = FileSchema.validate(dto);

      if (validated.error) {
        throw new FileException(validated.error.message);
      }

      const resData = await this.#fileService.create(dto, file);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }

  async getById(req, res) {
    try {
      const Id = req.params?.id;

      const resData = await this.#fileService.getById(Id);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }

  async getAll(req, res) {
    const resData = await this.#fileService.getAll();

    return res.status(resData.statusCode).json(resData);
  }

  async delete(req, res) {
    try {
      const Id = req.params?.id;

      const resData = this.#fileService.delete(Id);

      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }
}

module.exports = { FilesController };

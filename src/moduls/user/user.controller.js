const { ResData } = require("../../lib/resData");
const { userLoginSchema, userRegisterSchema } = require("./schema/user.schema");
const {UserBadRequestException } = require("./exception/user.exception.js")

class UserController {
  #userService;
  constructor(userService) {
    this.#userService = userService;
  }

  async login(req, res) {
    try {
      const dto = req.body[0];
      const validated = userLoginSchema.validate(dto);

      if (validated.error) {
        throw new UserBadRequestException(validated.error.message);
      }

      const resData = await this.#userService.login(dto);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }

  async register(req, res) {
    try {
      const dto = req.body[0];
      const validated = userRegisterSchema.validate(dto);

      if (validated.error) {
        throw new UserBadRequestException(validated.error.message);
      }
      const resData = await this.#userService.register(dto);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }

  async getById(req, res) {
    try {
      const Id = req.params.id;

      const resData = await this.#userService.getById(Id);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }

  async getAll(req, res) {
    const resData = await this.#userService.getAll();

    return res.status(resData.statusCode).json(resData);
  }

  async delete(req, res) {
    try {
      const Id = req.params.id;

      const resData = await this.#userService.delete(Id);

      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }
}

module.exports = { UserController };

const { ResData } = require("../../lib/resData");
const { testSchema } = require("./schema/test.schema.js");
const { TestBadRequestException } = require("./exception/test.exception.js");

class TestController {
  #testService;
  constructor(testService) {
    this.#testService = testService;
  }

  async getAllTest(req, res) {
    const resData = await this.#testService.getAllTest();

    res.status(200).json(resData);
  }

  async createTest(req, res) {
    try {
      const dto = req.body[0];

      const validated = testSchema.validate(dto);

      if (validated.error) {
        throw new TestBadRequestException(validated.error.message);
      }
      const resData = await this.#testService.createTest(req.body);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }

  async getOneTestById(req, res) {
    try {
      const testId = req.params.id;

      const resData = await this.#testService.getOneTestById(Number(testId));

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }

  async deleteTest(req, res) {
    try {
      const testId = req.params.id;

      const resData = await this.#testService.deleteTest(Number(testId));

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }
}

module.exports = { TestController };

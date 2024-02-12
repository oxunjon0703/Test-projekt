const { ResData } = require("../../lib/resData");
const {
  QuestionBadRequestException,
} = require("./exception/question.exception.js");
const { questionSchema } = require("./schema/question.schema.js");

class QuestionController {
  #questionService;
  constructor(questionService) {
    this.#questionService = questionService;
  }

  async getAllQuestion(req, res) {
    const resData = await this.#questionService.getAllQuestion();

    res.status(200).json(resData);
  }

  async createQuestion(req, res) {
    try {
      const dto = req.body[0];

      const validated = questionSchema.validate(dto);

      if (validated.error) {
        throw new QuestionBadRequestException(validated.error.message);
      }

      const resData = await this.#questionService.createQuestion(req.body);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }

  async getOneQuestionById(req, res) {
    try {
      const Id = req.params.id;

      const resData = await this.#questionService.getOneQuestionById(Id);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }

  async deleteQuestion(req, res) {
    try {
      const Id = req.params.id;

      const resData = await this.#questionService.deleteQuestion(Id);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }
}

module.exports = { QuestionController };

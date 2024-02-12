const path = require("path");
const { ResData } = require("../../lib/resData.js");
const {
  QuestionNotFoundByIdException,
} = require("./exception/question.exception.js");
const { QuestionRepository } = require("./question.repository.js");
const { QuestionEntity } = require("./entity/question.entity.js")

class QuestionService {
  #repository;
  constructor() {
    this.#repository = new QuestionRepository();
  }

  async getAllQuestion() {
    const questions = await this.#repository.getAll();

    const resData = new ResData("get all questons", 200, questions);

    return resData;
  }

  async createQuestion(dto) {
    const question = new QuestionEntity(dto.title);

    const newQuestion = await this.#repository.create(question);

    const resData = new ResData("question created", 201, newQuestion);

    return resData;
  }

  async getOneQuestionById(Id) {
    const QuestionById = await this.#repository.getById(Id);

    if (!QuestionById) {
      throw new QuestionNotFoundByIdException();
    }

    const resData = new ResData("question by id", 201, QuestionById);

    return resData;
  }

  async deleteQuestion(Id) {
    const QuestionById = await this.#repository.getById(Id);

    if (!QuestionById) {
      throw new QuestionNotFoundByIdException();
    }

    const deleteQuestion = await this.#repository.delete(Id)

    const resData = new ResData("deleted question", 200, QuestionById);

    return resData;
  }
}

module.exports = { QuestionService };

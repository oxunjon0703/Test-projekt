const { ResData } = require("../../lib/resData.js");
const { TestRepository } = require("./test.repository.js");
const { TestNotFoundByIdException } = require("./exception/test.exception.js");
const { TestEntity } = require("./entity/test.entity.js");

class TestService {
  #repository;
  constructor() {
    this.#repository = new TestRepository();
  }

  async getAllTest() {
    const tests = await this.#repository.getAll();

    const resData = new ResData("get all tests", 200, tests);

    return resData;
  }

  async createTest(dto) {
    const test = new TestEntity(dto.title);

    const newTest = await this.#repository.create(test);

    const resData = new ResData("test created", 201, newTest);

    return resData;
  }

  async getOneTestById(Id) {
    const TestById = await this.#repository.getById(Id);

    const resData = new ResData("test by id", 200, TestById);

    return resData;
  }

  async deleteTest(Id) {
    const TestById = await this.#repository.getById(Id);

    if (!TestById) {
      throw new TestNotFoundByIdException();
    }

    const deleteTest = await this.#repository.delete(Id);

    const resData = new ResData("deleted test", 200, foundTestById);

    return resData;
  }
}

module.exports = { TestService };

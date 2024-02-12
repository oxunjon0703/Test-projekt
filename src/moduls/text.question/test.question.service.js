const { ResData } = require("../../lib/resData.js");

class TestQuestionService {

  async getAllTestQuestion() {

    const resData = new ResData("get all testQuestion", 200, testQuestion);

    return resData;
  }

  async createTestQuestion(dto) {

    const resData = new ResData("test created", 201, newTestQuestion);

    return resData;
  }
}

module.exports = { TestQuestionService };

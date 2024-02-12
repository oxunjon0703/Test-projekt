const { ResData } = require("../../lib/resData");

class TestQuestionController {
    #testQuestionService
    constructor (testQuestionService) {
        this.#testQuestionService = testQuestionService;
    };

    async getAllTestQuestion (req, res) {
        
    const resData = await this.#testQuestionService.getAllTestQuestion();

    res.status(200).json(resData);
    };

    async createTestQuestion(req, res) {
        try {
          const resData = await this.#testQuestionService.createTestQuestion(req.body);
    
          res.status(resData.statusCode).json(resData);
        } catch (error) {
          const resData = new ResData(
            error.message || "server error",
            error.statusCode || 500,
            null,
            error
          );
    
          res.status(resData.statusCode).json(resData);
        }
      }
};

module.exports = { TestQuestionController }
const { Router } = require("express");
const router = Router();

const { TestQuestionService } = require("./test.question.service");
const { TestQuestionController } = require("./test.question.controller");

const testQuestionService = new TestQuestionService();
const testQuestionController = new TestQuestionController(testQuestionService);


router.get("/", (req, res) => {
  testQuestionController.getAllTestQuestion(req, res);
});

router.post("/", (req, res) => {
  testQuestionController.createTestQuestion(req, res);
});

module.exports = { router };

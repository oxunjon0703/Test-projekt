const { Router } = require("express");
const router = Router();
const { TestController } = require("./test.controller.js");
const { TestService } = require("./test.service.js");

const testService = new TestService();
const testController = new TestController(testService);

router.get("/", (req, res) => {
  testController.getAllTest(req, res);
});

router.get("/:id", (req, res) => {
  testController.getOneTestById(req, res);
});

router.post("/", (req, res) => {
  testController.createTest(req, res);
});

router.delete("/:id", (req, res) => {
  testController.deleteTest(req, res);
});

module.exports = { router };

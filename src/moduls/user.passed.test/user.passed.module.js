const { Router } = require("express");
const router = Router();

const { UserPassedService } = require("./user.passed.service");
const { UserPassedController } = require("./user.passed.controller");

const userPassedService = new UserPassedService()
const userPassedController = new UserPassedController(userPassedService)

router.get("/", (req, res) => {
  userPassedController.getAllUserPassed(req, res);
});

module.exports = {router}
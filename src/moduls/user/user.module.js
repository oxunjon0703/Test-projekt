const { Router } = require("express");

const router = Router();

const { UserController } = require("./user.controller.js");
const { UserService } = require("./user.service.js");

const userService = new UserService();
const userController = new UserController(userService);

router.get("/", (req, res) => {
  userController.getAll(req, res);
});

router.get("/:id", (req, res) => {
  userController.getById(req, res);
});

router.post("/login", (req, res) => {
  userController.login(req, res);
});

router.post("/register", (req, res) => {
  userController.register(req, res);
});

router.delete("/:id", (req, res) => {
  userController.delete(req, res);
});

module.exports = { router };

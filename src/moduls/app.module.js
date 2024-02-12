const { Router } = require("express");
const router = Router();
const test = require("./test/test.module.js");
const user = require("./user/user.module.js");
const variant = require("./variant/variant.module.js");
const testQuestion = require("./text.question/test.question.module.js");
const userPassed = require("./user.passed.test/user.passed.module.js");
const files = require("./files/files.module.js")

router.use("/test", test.router);
router.use("/user", user.router);
router.use("/variant", variant.router);
router.use("/testQuestion", testQuestion.router);
router.use("/userPassed", userPassed.router);
router.use("/files", files.router);

module.exports = { router };

const { Router } = require("express");
const { FileService } = require("./files.service");
const { FilesController } = require("./files.controller");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, "../../../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage });

const router = Router();


const filesServer = new FileService();
const filesController = new FilesController(filesServer);

router.post("/create", upload.single("media"), (req, res) => {
  filesController.create(req, res);
});

router.get("/", (req, res) => {
  filesController.getAll(req, res);
});

router.get("/:id", (req, res) => {
  filesController.getById(req, res);
});

router.delete("/:id", (req, res) => {
  filesController.delete(req, res);
});

module.exports = { router };
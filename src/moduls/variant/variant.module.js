const { Router } = require("express");
const router = Router();
const { VariantService } = require("./variant.service");
const { VariantController } = require("./variant.controller");

const variantService = new VariantService();
const variantController = new VariantController(variantService);

router.get("/", (req, res) => {
  variantController.getAllVariant(req, res);
});

router.post("/", (req, res) => {
  variantController.createVariant(req, res);
});

module.exports = { router };

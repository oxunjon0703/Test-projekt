const { ResData } = require("../../lib/resData");

class VariantController {
  #variantService;
  constructor(variantService) {
    this.#variantService = variantService;
  }

  async getAllVariant(req, res) {
    const resData = await this.#variantService.getAllVariant();

    res.status(200).json(resData);
  }

  async createVariant(req, res) {
    try {
      const resData = await this.#variantService.createVariant(req.body);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }
}

module.exports = { VariantController };

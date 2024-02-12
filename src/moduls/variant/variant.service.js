const { ResData } = require("../../lib/resData.js");

class VariantService {
  async getAllVariant() {
    const resData = new ResData("get all variants", 200, variants);

    return resData;
  }

  async createVariant(dto) {
    const resData = new ResData("variant created", 201, newVariant);

    return resData;
  }
}

module.exports = { VariantService };

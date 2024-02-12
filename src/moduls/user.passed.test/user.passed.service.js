const { ResData } = require("../../lib/resData.js");

class UserPassedService {
  async getAllUserPassed() {
    const resData = new ResData("get all userPassed", 200, userPassed);

    return resData;
  }
}

module.exports = { UserPassedService };

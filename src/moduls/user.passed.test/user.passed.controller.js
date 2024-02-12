const { ResData } = require("../../lib/resData");

class UserPassedController {
    #userPassedService;
    constructor (userPassedService) {
        this.#userPassedService = userPassedService;
    };

    async getAllUserPassed (req, res) {
        
    const resData = await this.#userPassedService.getAllUserPassed();

    res.status(200).json(resData);
    };
};

module.exports = {UserPassedController}
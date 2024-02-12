const bcrypt = require("bcrypt");

const heshPassword = async (data) => {
    return await bcrypt.hash(data, 10);
};

const verifyPassword = async (data, hashpass) => {
    return await bcrypt.compare(data, hashpass);
};

module.exports = { heshPassword, verifyPassword };
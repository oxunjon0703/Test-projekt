const jwt = require("jsonwebtoken");
require("dotenv/config");

const jwtKey = process.env.SEKRET_KEY;

const getToken = (data) => {
  return jwt.sign(data, jwtKey);
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtKey);
};

module.exports = { getToken, verifyToken };

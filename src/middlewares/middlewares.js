import { verifyToken } from "../lib/jwt.js";
import { TokenIsInvalidException, TokenRequiredException } from "./exception/middleware.exception.js";
import { ResData } from "../lib/resData.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { DataSource } from "../lib/datasource.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export class Middleware {
  async checkToken(req, res, next) {
    try {
      const token = req.headers?.token;

      if (!token) {
        throw new TokenRequiredException();
      }

      const userId = verifyToken(token);

      if(userId) {
        throw new TokenIsInvalidException
      }

      req.userId = userId;

      return next();
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }

  async adminRole(req, res, next) {
    const userId = req.userId;

    const userPath = join(__dirname, "../../database", "user.json");

    const userDataSorce = new DataSource(userPath);

    const users = userDataSorce.read();

    const foundUser = users.find((user) => user.id === userId);

    if (foundUser && foundUser.role === "admin") {
      req.userId = foundUser;

      return next();
    } else {
      const resData = new ResData("not access", 403);

      return res.status(resData.statusCode).json(resData);
    }
  }

  async userRole(req, res, next) {
    const userId = req.userId;

    const userPath = join(__dirname, "../../database", "user.json");

    const userDataSorce = new DataSource(userPath);

    const users = userDataSorce.read();

    const foundUser = users.find((user) => user.id === userId);

    if (foundUser && foundUser.role === "user") {
      req.userId = foundUser;

      return next();
    } else {
      const resData = new ResData("not access", 403);

      return res.status(resData.statusCode).json(resData);
    }
  }
}

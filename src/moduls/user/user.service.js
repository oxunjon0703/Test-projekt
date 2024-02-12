const { ResData } = require("../../lib/resData.js");
const { getToken } = require("../../lib/jwt.js");
const { UserRepository } = require("./user.repository.js");
const { heshPassword, verifyPassword } = require("../../lib/bcrypt.js");
const { UserEntity } = require("./entity/user.entity.js");
const {
  UserNotFoundByIdException,
  PhoneORPassWrongException,
  UserAlreadyExistException,
} = require("./exception/user.exception.js");

class UserService {
  #repository;
  constructor() {
    this.#repository = new UserRepository();
  }

  async getAll() {
    const users = await this.#repository.getAll();

    const resData = new ResData("all users", 200, users);

    return resData;
  }

  async getById(Id) {
    const UserById = await this.#repository.getById(Id);

    if (!UserById) {
      throw new UserNotFoundByIdException();
    }

    const resData = new ResData("foun user by id", 200, UserById);

    return resData;
  }

  async login(dto) {
    const foundUser = await this.#repository.findOneByLogin(dto.login);

    console.log("foundUser :", foundUser);

    if (!foundUser) {
      throw new PhoneORPassWrongException();
    }

    const VerifyPassword = await verifyPassword(
      dto.password,
      foundUser.password
    );

    if (!VerifyPassword) {
      throw new PhoneORPassWrongException();
    }

    const newToken = getToken(foundUser.id);

    const resData = new ResData("login success", 200, {
      user: foundUser,
      token: newToken,
    });

    return resData;
  }

  async register(dto) {
    const founUserByLogin = await this.#_findByLogin(dto.login);

    if (founUserByLogin) {
      throw new UserAlreadyExistException();
    }

    const hashedPassword = await heshPassword(dto.password);

    const userObject = Object.assign(dto, { password: hashedPassword });

    const newUserEntity = new UserEntity(userObject);

    const createdUser = await this.#repository.insert(newUserEntity);

    const resData = new ResData("user created", 201, {
      user: createdUser,
    });

    return resData;
  }

  async delete(Id) {
    const UserById = await this.#repository.getById(Id);

    if (!UserById) {
      throw new UserNotFoundByIdException();
    }

    const deleteUser = await this.#repository.delete(Id);

    const resData = new ResData("delete users", 200, UserById);

    return resData;
  }

  async #_findByLogin(login) {
    const foundUserByLogin = await this.#repository.findOneByLogin(login);

    return foundUserByLogin;
  }
}

module.exports = { UserService };

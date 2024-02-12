class UserAlreadyExistException extends Error {
  constructor() {
    super("this phone already exist!");
    this.statusCode = 400;
  }
}

class UserBadRequestException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class UserNotFoundByIdException extends Error {
  constructor() {
    super("User not found by id");
    this.statusCode = 404;
  }
}

class PhoneORPassWrongException extends Error {
  constructor() {
    super("Phone or password are wrong!");
    this.statusCode = 400;
  }
}

module.exports = {UserAlreadyExistException, UserBadRequestException, UserNotFoundByIdException, PhoneORPassWrongException}
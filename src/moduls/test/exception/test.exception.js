class TestBadRequestException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class TestNotFoundByIdException extends Error {
  constructor() {
    super("Test not found by id");
    this.statusCode = 404;
  }
}

module.exports = { TestBadRequestException, TestNotFoundByIdException };

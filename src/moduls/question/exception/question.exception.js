class QuestionBadRequestException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class QuestionNotFoundByIdException extends Error {
  constructor() {
    super("Question not found by id");
    this.statusCode = 404;
  }
}

module.exports = { QuestionBadRequestException, QuestionNotFoundByIdException };

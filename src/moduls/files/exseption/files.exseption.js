class FileException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class FileNotFoundByIdException extends Error {
  constructor() {
    super("File not found by id");
    this.statusCode = 404;
  }
}

module.exports = { FileException, FileNotFoundByIdException };

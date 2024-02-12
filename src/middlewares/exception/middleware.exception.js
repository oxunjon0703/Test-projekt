export class TokenRequiredException extends Error {
  constructor() {
    super("token must be required!");
    this.statusCode = 401;
  }
}

export class TokenIsInvalidException extends Error {
  constructor() {
    super("token is invalid");
    this.statusCode = 401;
  }
}

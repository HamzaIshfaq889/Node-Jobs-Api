const CustomAPiError = require("./customError");
const { StatusCodes } = require("http-status-codes");

class UnauthorizedError extends CustomAPiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
module.exports = UnauthorizedError;

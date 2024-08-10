const BadRequestError = require("./badRequest");
const CustomAPiError = require("./customError");
const NotFoundError = require("./notFound");
const UnauthorizedError = require("./unauthorized");

module.exports = {
  BadRequestError,
  CustomAPiError,
  NotFoundError,
  UnauthorizedError,
};

const { CustomAPiError } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");

const customErrorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err?.message || "Something went wrong, try again later.",
  };

  //handling validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((item) => item?.properties?.message)
      .join(",");

    customError = {
      statusCode: StatusCodes.BAD_REQUEST,
      message: message,
    };
  }

  //handling duplication error
  if (err.errorResponse && err.errorResponse.code === 11000) {
    const message = `This email ${Object.values(
      err.errorResponse.keyValue
    )} already exists.Please provide another email.`;

    customError = {
      statusCode: StatusCodes.BAD_REQUEST,
      message,
    };
  }

  //handling castError
  if (err.name === "CastError") {
    customError = {
      statusCode: StatusCodes.BAD_REQUEST,
      message: `No item found with this id: ${err.value}`,
    };
  }

  return res.status(customError.statusCode).json({ msg: customError.message });
  // return res.status(customError.statusCode).json(err);
};

module.exports = customErrorHandler;

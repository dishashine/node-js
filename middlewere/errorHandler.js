const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (key) {
    case constants.NOT_FOUND:
      res.json({
        title: "Not found",
        message: err.message,
        stackTrace: err.satck,
      });

      break;
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation failed",
        message: err.message,
        stackTrace: err.satck,
      });

    case constants.FORBIDDEN:
      res.json({
        title: "forbidden ",
        message: err.message,
        stackTrace: err.satck,
      });

    case constants.UNAUTHORIZED:
      res.json({
        title: "unauthorized",
        message: err.message,
        stackTrace: err.satck,
      });

    case constants.SERVER_ERROR:
      res.json({
        title: "server error",
        message: err.message,
        stackTrace: err.satck,
      });

      break;
    default:
      break;
  }
};
module.exports = errorHandler;

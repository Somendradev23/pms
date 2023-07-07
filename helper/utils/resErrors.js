// error-handler.js
const { ValidationError } = require("sequelize");

// Function to handle all types of errors
function errorHandler(err, req, res, next) {
  // Default error response
  let statusCode = 500;
  let responseData = {
    error: "Internal Server Error",
    messages: err.message,
  };

  // Handle different error types using switch case
  switch (err.name) {
    case "ValidationError":
      statusCode = 400;
      responseData = {
        error: "Validation Error",
        messages: err.errors.map((error) => error.message),
      };
      break;
    case "SequelizeUniqueConstraintError":
      statusCode = 400;
      responseData = {
        error: "Validation Error 2",
        messages: err.errors.map((error) => {
          return { msg: error.message };
        }),
      };
      break;
    case "UnauthorizedError":
      statusCode = 401;
      responseData = {
        error: "Unauthorized",
        messages: err.message,
      };
      break;
    case "NotFoundError":
      statusCode = 404;
      responseData = {
        error: "Not Found",
        messages: err.message,
      };
      break;
    default:
      break;
  }

  // Log the error for debugging purposes
  console.error(err);

  // Send the response
  res.status(statusCode).json(responseData);
}

module.exports = errorHandler;

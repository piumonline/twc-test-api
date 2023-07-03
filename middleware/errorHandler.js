const constants = {
    VALIDATION_ERROR: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  };
  
  const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
  
    switch (statusCode) {
      case constants.VALIDATION_ERROR:
        res.json({
          title: "Validation Failed",
          message: err.message,
        });
        next(err); // Pass control to the next middleware/error handler
        break;
      case constants.NOT_FOUND:
        res.json({
          title: "Not Found",
          message: err.message,
        });
        next(err); // Pass control to the next middleware/error handler
        break;
      case constants.UNAUTHORIZED:
        res.json({
          title: "Unauthorized",
          message: err.message,
        });
        next(err); // Pass control to the next middleware/error handler
        break;
      case constants.FORBIDDEN:
        res.json({
          title: "Forbidden",
          message: err.message,
        });
        next(err); // Pass control to the next middleware/error handler
        break;
      case constants.SERVER_ERROR:
        res.json({
          title: "Server Error",
          message: err.message,
        });
        next(err); // Pass control to the next middleware/error handler
        break;
      default:
        console.log("No Error!");
        break;
    }
  };
  
  module.exports = errorHandler;
  
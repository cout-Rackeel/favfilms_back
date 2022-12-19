class JSONResponse {
  static success(res, message = "success", body, status) {
     res.status(status ?? res.statusCode).json({
        status: status ?? res.statusCode,
        message : message ?? "success",
        body : body ?? {}, 
     });
  }

  static error(res, message="error", error, status) {
     res.status(status ?? res.statusCode).json({
        message : message,
        error : error,
        status: status ?? res.statusCode,
     });
  }
}

module.exports = { JSONResponse }; 
const HttpStatus = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
});

const HttpResponseMessage = Object.freeze({
  SUCCESS: "Success",
  CREATED: "Resource created successfully",
  BAD_REQUEST: "Bad Request",
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Access Forbidden",
  NOT_FOUND: "Resource not found",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
});

module.exports = {
  HttpStatus,
  HttpResponseMessage,
};

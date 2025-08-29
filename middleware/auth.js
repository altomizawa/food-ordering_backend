const jwt = require("jsonwebtoken");
require("dotenv").config();

const { HttpStatus, HttpResponseMessage } = require("../enums/http");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const secretKey = process.env.TOKEN_KEY;
  // CHECK FOR EXISTING AUTHORIZATION
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(HttpStatus.FORBIDDEN).send(HttpResponseMessage.FORBIDDEN);
  }

  // AUTHORIZATION OK, CLEAN UP TOKEN
  const token = authorization.replace("Bearer ", "");

  // CREATE PAYLOAD
  let payload;
  // CHECK IF PAYLOAD MATCHES EXISTING PAYLOAD
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return res.status(HttpStatus.FORBIDDEN).send(HttpResponseMessage.FORBIDDEN);
  }

  // PAYLOAD MATCHES, SET PAYLOAD TO REQ.USER
  req.user = payload;

  // CALL NEXT FUNCTION
  next();
};

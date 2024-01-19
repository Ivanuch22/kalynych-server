const jwt = require("jsonwebtoken");
const ApiError = require("../error/AppiError");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; 
    if (!token) return ApiError.badRequest("User is not registered")

    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACESS);
    req.user = decoded;
    next();
  } catch (e) {
    return ApiError.badRequest("User is not registered")
  }
};

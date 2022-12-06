const jwt = require("jsonwebtoken");

function jwtAuthMiddleware(req, res, next) {
  // Capture jwtToken
  const jwtToken =
    req.get("Authorization") || req.query.jwtToken || req.body.jwtToken;

  // Test we have the jwtToken
  if (!jwtToken) {
    const error = new Error("no jwtToken provided");
    error.status = 401;
    next(error);
    return;
  }

  // Test the jwtToken is valid
  jwt.verify(jwtToken, process.env.JWT_SECRET, (error, payload) => {
    // if jwtToken is not valid
    if (error) {
      const invalidError = new Error("Invalid jwtToken");
      invalidError.status = 401;
      next(invalidError);
      return;
    }

    // Add to request the payload of jwtToken (so it will can be used at next middlewares)
    req.userId = payload.userId;
  });
  next();
}

module.exports = jwtAuthMiddleware;

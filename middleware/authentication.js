const { UnauthorizedError } = require("../errors");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader && !authorizationHeader?.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authentication Invalid.");
  }
  const token = authorizationHeader.split(" ")[1];

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: payload.id,
    };
    next();
  } catch (error) {
    throw new UnauthorizedError("Authentication Invalid.");
  }
};

module.exports = auth;

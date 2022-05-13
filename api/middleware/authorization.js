const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authorization = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(403).send({ error: "Access denied" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;

    next();
  } catch (error) {
    res.status(403).send({ error: "Authorization Failed" });
  }
};

module.exports = authorization;

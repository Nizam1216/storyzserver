const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  // This will come from the header of the Axios request
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "Unauthorized access" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next(); // Call next to pass control to the next middleware or route handler
  } catch (error) {
    return res.status(401).send({ error: "Unauthorized!! Access revoked" });
  }
};

module.exports = fetchUser;

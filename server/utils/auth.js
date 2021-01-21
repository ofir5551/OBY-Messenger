const jwt = require("jsonwebtoken");
const utils = require("../utils/users");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "ofirbenyamin");
    const user = await utils.findUserById(decoded.userId);

    if (!user || user.token != token) {
      throw new Error();
    }

    req.token = token;
    req.user = user; // Add a property 'user' to the request
    next();
  } catch (err) {
    res
      .status(401)
      .send({ error: "Invalid authorization - Please login again." });
  }
};

module.exports = auth;

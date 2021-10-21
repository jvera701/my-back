const jwt = require("jsonwebtoken");
const config = require("./../../config/environment/index")
const User = require("../api/user")

//TODO: refactor this
const auth = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    const data = jwt.verify(token, config.jwtKey);

    let user = await User.findOne({ _id: data.userId });
    if (user) {
      res.locals.user = user;
      next();
    } else {
      res.status(401).json({ error: "User not found" });
      return;
    }
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      res.status(401).json({ error: "Invalid Token" });
      return;
    }
    next(err);
  }
};
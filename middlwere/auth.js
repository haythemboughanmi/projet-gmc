const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  //get token from header
  const token = req.header("mytoken");
  // chek if not token
  if (!token) {
    return res.status(401).json({ msg: "no token ,authorization denied" });
  }
  // verify token
  else{
    try {
      const decoded = jwt.verify(token, process.env.secretkey);
      req.user = decoded.user;
      next();
    } catch (error) {
      res.status(401).json({ msg: "token is not valid" });
    }
  }
 
};

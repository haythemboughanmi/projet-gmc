const express = require("express");
const auth = require("../../middlwere/auth");
const User = require("../../model/Users");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const router = express.Router();
//get api/auth
//access public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
});
//post api/auth
//authencate user & get token
//access public
router.post(
  "/",
  // chek if validation
  body("email", "please  include a valid email").isEmail(),
  body("password", "password is required").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      // see if not email existe
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Invalid credentials" }] });
      }
      //comapre password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ errors: [{ msg: "Invalid credentials" }] });
      }

      // token
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, process.env.secretkey, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("serveur error");
    }
  }
);
module.exports = router;

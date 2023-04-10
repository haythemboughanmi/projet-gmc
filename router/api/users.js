const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
require("dotenv").config()
const User = require("../../model/Users");
const router = express.Router();

//post api/user
//register user
//access public
router.post(
  "/",
  // chek if validation
  body("name", "name is required").not().isEmpty(),
  body("email", "please  include a valid email").isEmail(),
  body(
    "password",
    "please enter your password with 8 or more characters"
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      // see if email existe
      const found = await User.findOne({ email });
      if (found) {
        return res
          .status(400)
          .send({ errors: [{ msg: "email already exists" }] });
      }
      // get users gravator
      const avatar = await gravatar.url(email, { s: "200", f: "y", d: "404" });

      const user = new User(req.body);
      // encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = bcrypt.hashSync(password, salt);
      await user.save();
      // token
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload,process.env.secretkey,(err,token)=>{
        if(err) throw err ;
        res.json({token})
      })
    } catch (error) {
      console.log(error.message);
      res.status(500).send("serveur error");
    }
  }
);

module.exports = router;

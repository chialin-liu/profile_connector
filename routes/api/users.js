const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecret = config.get("jwtSecret");
//@Post /api/users/
//@desc  register
//@access public

router.post(
  "/",
  [
    check("name").exists(),
    check("email").isEmail(),
    check("password").isLength({ min: 6 })
  ],
  async (req, res) => {
    const user_name = req.body.name;
    const user_email = req.body.email;
    const user_password = req.body.password;
    //check error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }
    try {
      // check duplicate username'
      console.log("Name:" + user_name);
      let db_name = await User.findOne({ name: user_name });
      let db_email = await User.findOne({ email: user_email });
      if (db_name) {
        console.log("User does exist");
        return res.status(400).json({ msg: "User does already exist" });
      }
      if (db_email) {
        console.log("Email does exist");
        return res.status(400).json({ msg: "Email does already exist" });
      }

      //add gravatar
      const user_avatar = gravatar.url(user_email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });
      //create new user
      const newUser = new User({
        name: user_name,
        email: user_email,
        avatar: user_avatar,
        password: user_password
      });
      // console.log("New USER ID: " + newUser.id);
      //secure the password
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(user_password, salt);

      await newUser.save();

      const payload = {
        person: {
          id: newUser.id
        }
      };
      jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        else {
          // console.log("Token success");
          res.json({
            token,
            msg: "Token server received"
          });
        }
      });
      // console.log("User registered");
      // res.send("User registered in MongoDB");
    } catch (err) {
      // return res.json({ msg: "Connection failed" });
      console.log("connection failed");
      console.log(err);
      return res.json(err);
    }
  }
);
module.exports = router;

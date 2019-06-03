const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecret = config.get("jwtSecret");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");

//@get /api/users/
//@search whether user is created success or not found
//@access public
//token is from user create
router.get("/", auth, async (req, res) => {
  try {
    console.log("API user id: " + req.person.id);
    const user = await User.findById(req.person.id).select("-password");
    console.log("API get User in DB: " + user);
    return res.json({ user });
  } catch (err) {
    return res.status(400).json({ msg: "Auth Failed" });
  }
});

//@Post /api/auth/
//@user login
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
      // console.log("Name:" + user_name);
      // console.log("Email:" + user_email);

      let db_user = await User.findOne({
        name: user_name,
        email: user_email
      });

      if (!db_user) {
        console.log("User does not exist");
        return res.status(400).json({ msg: "User does not exist" });
      }

      const isMatch = await bcrypt.compare(user_password, db_user.password);
      if (!isMatch) {
        return res.status(400).json({
          msg: "Wrong password"
        });
      }
      //Why needs token? TBD:
      //for editing profile
      const payload = {
        person: {
          id: db_user.id
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

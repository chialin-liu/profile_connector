const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecret = config.get("jwtSecret");

module.exports = (req, res, next) => {
  //TBD why use req.header
  const token = req.header("token-header");
  if (!token) {
    return res.status(401).json({
      msg: "No token, Auth process failed"
    });
  } else {
    try {
      const decoded_payload = jwt.verify(token, jwtSecret);
      // console.log("Content of JWT: " + JSON.stringify(decoded_payload));
      // console.log("Personal ID: " + decoded_payload);
      req.person = decoded_payload.person;
      console.log("Middelware: user id: " + JSON.stringify(req.person));
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        msg: "Token verified failed"
      });
    }
  }
};

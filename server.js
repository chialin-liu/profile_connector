const express = require("express");
const app = express();
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const auth = require("./routes/api/auth");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
app.use(cors());
app.options("*", cors()); //from stackoverflow
// app.use(cors());
//Connect MongoDB

connectDB();

//init middleware
app.use(express.json({ extended: false }));

//Use routes

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/auth", auth);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(3800, () => console.log("server is running"));

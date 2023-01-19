const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
//* register
router.post("/register", async (req, res) => {
  try {
    //generating a new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    //save user and send res back
    const user = await newUser.save();
    res
      .status(200)
      .json({ status: "true", message: "User saved successfully" });
  } catch (error) {
    res.status(500).json({
      status: "false",
      message: "You can not create this user" + error,
    });
  }
});

//* login
router.post("/login", async (req, res) => {
  try {
    //find the user
    const user = await User.findOne({ username: req.body.username });
    !user &&
      res.status(400).setHeader(user).json({
        status: "false",
        message: "Wrong username or password",
      });
    //validate the password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword &&
      res.status(400).json({
        status: "false",
        message: "Wrong username or password",
      });
    //send res
    res.status(200).json({
      status: "true",
      message: { _id: user.id, username: user.username },
    });
  } catch (error) {
    res.status(500).json({
      status: "false",
      message: "You can not create this user" + error,
    });
  }
});

module.exports = router;

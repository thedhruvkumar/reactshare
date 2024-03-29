const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const User = require("../models/Users");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET || "MY_SECRET_KEY";

//Register a new user to the database
router.post(
  "/register",
  body("email").isEmail().isLength({ min: 8 }),
  body("password").isLength({ min: 8 }),
  body("username").isLength({ min: 4 }),
  body("name").isLength({ min: 4 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success:false,errors: errors.array() });
    }

    try {
      let _user_email = await User.findOne({ email: req.body.email });
      let _user_username = await User.findOne({ username: req.body.username });
      if (_user_email) {
        return res.status(400).json({ error: "User Already Exist" });
      }
      if (_user_username) {
        return res.status(400).json({ error: "Username not available" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      const user = new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        city: req.body.city ?? " ",
        isAdmin: req.body.isAdmin ?? false,
      });

      const savedUser = await user.save();
      res.status(201).json({success:true,message:"Account Registered Successfully"})
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

//Login API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email:email });
    if (!user) return res.status(400).json({ success:false,error: "User not found!" });
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res
        .status(400)
        .json({ error: "Please Login with valid credential" });
    }
    
    const data = {
      user: {
        id: user.id,
        email:user.email,
        username:user.username,
        name:user.name,
        isAdmin:user.isAdmin
      },
    };
    
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.status(200).json({ success: true, authtoken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

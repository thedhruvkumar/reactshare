const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authorization = require("../middleware/authorization");
const { body, validationResult } = require("express-validator");
const User = require("../models/Users");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

//UPDATE USER API
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        res.status(500).json(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(403).json({ error: "You can update only your account" });
  }
});

//DELETE USER API
router.delete("/:id", authorization ,async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "Account Succesfully deleted" });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  } else {
    return res
      .status(403)
      .json({ success: false, error: "You can delete only your account" });
  }
});

//GET ALL USERS API
router.get("/fetch/all" , async(req,res)=>{
  try {
    const user = await User.find({}).select([
      "-password",
      "-createdAt",
      "-updatedAt",
    ]);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


//GET A USER API
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select([
      "-password",
      "-createdAt",
      "-updatedAt",
    ]);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

//FOLLOW USER API
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const currentUser = await User.findOne({ _id: req.body.userId });
      const user = await User.findById(req.params.id);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        return res
          .status(200)
          .json({
            success: true,
            message: "User has been followed successfully",
          });
      } else {
        return res
          .status(403)
          .json({ success: false, message: "User is already followed" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    return res
      .status(403)
      .json({ success: false, message: "You cant follow your self" });
  }
});
//UNFOLLOW USER API
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const currentUser = await User.findOne({ _id: req.body.userId });
      const user = await User.findById(req.params.id);

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        return res
          .status(200)
          .json({
            success: true,
            message: "User has been unfollowed successfully",
          });
      } else {
        return res
          .status(403)
          .json({ success: false, message: "User is already unfollowed" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    return res
      .status(403)
      .json({ success: false, message: "You cant unfollow your self" });
  }
});

module.exports = router;

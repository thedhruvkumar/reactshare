const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const authorization = require("../middleware/authorization");
const { body, validationResult } = require("express-validator");
const User = require("../models/Users");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

//UPDATE USER API
router.put("/:id", authorization, async (req, res) => {
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
router.delete("/:id", authorization, async (req, res) => {
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
router.get("/fetch/all", authorization, async (req, res) => {
  try {
    const user = await User.find().select([
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
router.get("/:id", authorization, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ success: false, error: "User Not Found" });

    const user = await User.findOne({_id:req.params.id}).select([
      "-password",
      "-updatedAt",
    ]);
    if(!user) return res.status(400).json({ success: false, error: "User Not Found" })
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

//FOLLOW USER API
router.put("/:id/follow", authorization, async (req, res) => {
  if (req.user.id !== req.params.id) {
    try {
      const currentUser = await User.findOne({ _id: req.user.id });
      const user = await User.findById(req.params.id);

      if (!user.followers.includes(req.user.id)) {
        await user.updateOne({ $push: { followers: req.user.id } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        return res.status(200).json({
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
router.put("/:id/unfollow", authorization, async (req, res) => {
  if (req.user.id !== req.params.id) {
    try {
      const currentUser = await User.findOne({ _id: req.user.id });
      const user = await User.findById(req.params.id);

      if (user.followers.includes(req.user.id)) {
        await user.updateOne({ $pull: { followers: req.user.id } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        return res.status(200).json({
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

//USERINFO BY TOKEN
router.post("/u/", authorization, async (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;

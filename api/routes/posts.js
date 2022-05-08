const router = require("express").Router();
const Post = require("../models/Posts");
const User = require("../models/Users");


//CREATE POST API
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
//UPDATE POST API
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    !post && res.status(404).json({ success: false, error: "Post not found" });
    if (post.userId.toString() === req.body.userId) {
      await post.updateOne({ $set: req.body });
      return res
        .status(200)
        .json({ success: true, error: "The post has been updated" });
    } else {
      return res
        .status(403)
        .json({ success: false, error: "You can update only your post" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
//DELETE POST API
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    !post && res.status(404).json({ success: false, error: "Post not found" });
    if (post.userId.toString() === req.body.userId) {
      await post.deleteOne();
      return res
        .status(200)
        .json({ success: true, error: "The post has been deleted" });
    } else {
      return res
        .status(403)
        .json({ success: false, error: "You can delete only your post" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
//LIKE/DISLIKE POST API
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    !post && res.status(404).json({ success: false, error: "Post not found" });
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      return res
        .status(200)
        .json({ success: true, error: "The post has been liked" });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      return res
        .status(200)
        .json({ success: true, error: "The post has been disliked" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
//GET A POST API
router.get("/:id/", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ success: false, error: "Post not found" });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
//GET TIMELINE POST API
router.get("/timeline/all", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts))
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;

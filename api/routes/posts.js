const router = require("express").Router();
const Post = require("../models/Posts");
const User = require("../models/Users");
const authorization = require("../middleware/authorization");

//CREATE POST API
router.post("/" , authorization , async (req, res) => {
  try {
    const newPost = new Post({
      desc:req.body.desc,
      img:req.body.img,
      userId:req.user.id
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
//UPDATE POST API
router.put("/:id", authorization ,async (req, res) => {
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
router.delete("/:id", authorization ,async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    !post && res.status(404).json({ success: false, error: "Post not found" });
    if (post.userId.toString() === req.user.id || req.user.isAdmin) {
      await post.deleteOne();
      return res
        .status(200)
        .json({ success: true, message: "The post has been deleted" });
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
router.put("/:id/like", authorization , async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    !post && res.status(404).json({ success: false, error: "Post not found" });
    if (!post.likes.includes(req.user.id)) {
      await post.updateOne({ $push: { likes: req.user.id } });
      return res
        .status(200)
        .json({ success: true,liked:true, message: "The post has been liked" });
    } else {
      await post.updateOne({ $pull: { likes: req.user.id} });
      return res
        .status(200)
        .json({ success: true,liked:false, message: "The post has been disliked" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
//GET A POST API
router.get("/:id/", authorization ,async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ success: false, error: "Post not found" });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
//GET TIMELINE POST API
router.get("/timeline/all" , authorization , async (req, res) => {
  try {
    
    const currentUser = await User.findById(req.user.id);
    const userPosts = await Post.find({ userId: currentUser._id });
    // const userPosts = await Post.find();
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
      );
      const resPost = userPosts.concat(...friendPosts);
      res.status(200).json(resPost.sort((a,b)=> b.createdAt - a.createdAt))
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

//GET USER'S ALL POSTS
router.get("/posts/:userid" , authorization , async(req,res)=>{
  try {
    const userPost = await Post.find({userId:req.params.userid});
    res.status(200).json(userPost.sort((a,b)=> b.createdAt - a.createdAt));
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
})

module.exports = router;

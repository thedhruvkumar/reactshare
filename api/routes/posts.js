const router = require("express").Router();
const Post = require("../models/Posts");
const User = require("../models/Users");

//CREATE POST API
router.post("/", async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost)
        
    } catch (error) {
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
});
//UPDATE POST API
router.put("/:id",async(req,res)=>{
    try {
        const post = Post.findById(req.params.id);
        if(post.userId===req.params.id){
            
        }else{
            return res.status(403).json({success:false,message:"You can update your post only"});
        }
    } catch (error) {
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
})
//DELETE POST API
//LIKE POST API
//GET A POST API
//GET TIMELINE POST API


module.exports = router;

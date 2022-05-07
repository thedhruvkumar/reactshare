const router = require('express').Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const User = require("../models/Users");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

//UPDATE USER API
router.put('/:id' , async (req,res)=>{
    if(req.body.userId===req.params.id ){
        if(req.body.password){
            try {
                const salt =  await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt)
            } catch (error) {
                res.status(500).json(error)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id , {$set:req.body});
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({error:"Internal server error"})
        }
    }else{
        return res.status(403).json({error:"You can update only your account"})
    }
})

//DELETE USER API
router.delete("/:id" , async(req,res)=>{
    if(req.body.userId===req.params.id){
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json({success:true,message:"Account Succesfully deleted"})
        } catch (error) {
            res.status(500).json({success:false,error:"Internal Server Error"})
        }
    }else{
        return res.status(403).json({success:false,error:"You can delete only your account"})
    }
})
//GET A USER API
router.get("/:id" ,async(req,res)=>{
    try {
        const user = await User.findById(req.params.id).select(["-password","-createdAt","-updatedAt"]);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({success:false,error:"Internal Server Error"})
        
    }
})
//GET ALL USERS
//FOLLOW USER API
//UNFOLLOW USER API

module.exports = router;
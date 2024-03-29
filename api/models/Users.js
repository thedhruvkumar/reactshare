const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      min: 4,
      max: 40,
      required: true,
    },
    name: {
      type: String,
      min: 4,
      max: 40,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      min: 8,
      max: 40,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      default: "",
      max: 50,
    },
    city: {
      type: String,
      default: "",
      max: 50,
    },
    from: {
      type: String,
      default: "",
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
    isVerified:{
      type:Boolean,
      default:false
    },
    createdAt: Number,
    updatedAt: Number,
  },
  { timestamps: { currentTime: ()=> Date.now() } }
);

module.exports = model("User", UserSchema);

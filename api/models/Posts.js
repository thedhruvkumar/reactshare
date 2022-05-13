const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    createdAt: Number,
    updatedAt: Number,
  },
  { timestamps:{ currentTime: ()=> Date.now() }}
);

module.exports = model("Post", PostSchema);

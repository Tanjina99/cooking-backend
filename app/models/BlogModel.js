const mongoose = require("mongoose");

// Comment Schema
const commentSchema = new mongoose.Schema({
  commenterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  commentText: { type: String, required: true },
  submissionDate: { type: Date, default: Date.now },
});

// Blog Schema
const blogSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  postDate: { type: Date, default: Date.now },
  category: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [commentSchema],
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = { Blog, commentSchema };

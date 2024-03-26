const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
    required: true,
  },
  views: {
    type: Number,
    default: 0, // Default view count is set to 0
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comments: [commentSchema],
});

module.exports = mongoose.model("notes", noteSchema);

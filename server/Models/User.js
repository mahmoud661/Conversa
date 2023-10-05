const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  nickname: String,
  selectedAvatar: Number,
});

module.exports = new mongoose.model("User", userSchema);
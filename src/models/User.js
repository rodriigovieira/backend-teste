const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },

  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    minlength: 8
  }
})

const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel

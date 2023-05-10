const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Name cannot ne empty"],
    },
    email: {
      type: String,
      required: [true, "Email cannot be empty"],
      unique: [true, "Email already registered...!"],
    },
    password: {
      type: String,
      required: [true, "Password cannot be empty"],
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Users", userSchema);

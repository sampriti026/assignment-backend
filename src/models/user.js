const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      min: 3,
      max: 20,
    },
    phoneNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      //enum: ["Male", "Female", "Others" ]
  }, 
    otp: {
      type: Number
    },
    expireIn: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

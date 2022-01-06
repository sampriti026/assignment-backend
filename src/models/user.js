const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    phoneNumber: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others" ]
  },
  },
  { timestamps: true }
);



module.exports = mongoose.model("User", userSchema);
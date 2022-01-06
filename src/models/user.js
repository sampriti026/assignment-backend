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
  },
  { timestamps: true }
);

const otpSchema = new mongoose.Schema({
  phoneNumber: Number,
  otp: Number,
  expireIn: Number,
  name:String,
  
}, {timestamps: true }
);


module.exports = mongoose.model("Otp", otpSchema);
module.exports = mongoose.model("User", userSchema);
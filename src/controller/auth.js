const  User = require("../models/user");
const  jwt = require("jsonwebtoken");
require('dotenv').config();

const express = require('express');
const cors = require( 'cors');
const cookieParser = require('cookie-parser');

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const crypto = require('crypto');
const smsKey = process.env.SMS_SECRET;
const twilioNum = process.env.TWILIO_PHONE_NUMBER;
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;



exports.signup = (req, res) => {

    const { name, phoneNumber, gender} = req.body
    User.findOne({phoneNumer: phoneNumber}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
        
        const otp = Math.floor(100000 + Math.random() * 900000);

        client.messages
		.create({
			body: `Your One Time Password is ${otp}`,
			from: twilioNum,
			to: phoneNumber
		})
		.then((messages) => console.log(messages))
		.catch((err) => console.error(err));
        
        res.status(200).send({ phoneNumber, otp});
                
        const user = new User({
                name,
                gender,
                phoneNumber,
                otp,
            })
        
        }
})

}



// exports.signin = (req, res) => {

// User.findOne({ phoneNumber: req.body.phoneNumber }).exec( (error, user) => {
//   if (error) return res.status(400).json({ error });
//   if (user) {
    
//     if(user.authenticate(req.body.password))
//      {
//       const token = jwt.sign(
//         { _id: user._id },
//         process.env.JWT_SECRET,
//         { expiresIn: "1h" }
//       );
//     //   const token = generateJwtToken(user._id, user.role);
//     const { _id, firstName, lastName, email, role, fullName } = user;
//       res.status(200).json({
//         token,
//         user: { _id, firstName, lastName, email, role, fullName },
//       });
//     } else {
//       return res.status(400).json({
//         message: "Invalid password",
//       })
//     }
//   } else {
//     return res.status(400).json({ message: "Something went wrong" });
//   }
// });
// }


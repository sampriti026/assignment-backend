const User = require("../models/user");
const Otp = require("../models/otp");
const  jwt = require("jsonwebtoken");
require('dotenv').config();

const express = require('express');
const cors = require( 'cors');
const cookieParser = require('cookie-parser');

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const crypto = require('crypto');
const { UserInstance } = require("twilio/lib/rest/chat/v1/service/user");
const user = require("../models/user");
const { sensitiveHeaders } = require("http2");
const { baseModelName } = require("../models/user");

const smsKey = process.env.SMS_SECRET;
const twilioNum = process.env.TWILIO_PHONE_NUMBER;
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;


//create a new user account
exports.signup = (req, res) => {

    const { name, phoneNumber, gender} = req.body
    
    User.findOne({phoneNumber: phoneNumber}, (err, user) => {
        if(user){
            res.send({message: "User already registered"})
        } else {

            const otp = Math.floor(100000 + Math.random() * 900000);
            // client.messages
            // .create({
            // 	body: `Your One Time Password is ${otp}`,
            // 	from: twilioNum,
            // 	to: phoneNumber
            // })
            // .then((messages) => console.log(messages))
            // .catch((err) => console.error(err));
                    
            const otpData =  new Otp({
                    name: name,
                    phoneNumber: phoneNumber,
                    gender: gender,
                    otp: otp,
                    expireIn: new Date().getTime() + 300*1000,                   
                    
            }) 
            otpData.save(err => {
                if(err)  {
                    res.send(err)
                } else {
                    res.status(200).send({ phoneNumber, otp, });
            }
            })
            }
    })
}

exports.verifyOtp = (req, res) => {
    
    const {otp} = req.body

    Otp.findOne({otp: otp}, (err, user) => {
        if(user){

            let currentTime = new Date().getTime();
            let diff = Otp.expireIn - currentTime;
            
            if(diff < 0){
            res.send({message: 'OTP expired, please try again.'})
            }
            else {
                
                const phoneNumber = user.phoneNumber
                const gender = user.gender
                const newUser = new User({
                    name: user.name,
                    phoneNumber: user.phoneNumber,
                    gender: user.gender,
                    otp: otp,
                    expireIn: new Date().getTime() + 300*1000,  
                })
                newUser.save(err => {
                    if(err) {
                        res.send(err)
                    } else {
                        Otp.deleteMany({phoneNumber: user.phoneNumber}, function (err, user) {
                            if (err) {
                                return console.log(err);
                            }
                            else{
                                res.send({message: "OTP verified!", user: newUser})
                            }
                        })
            
                       
                    }
                }) 
            }

        } 
        else {
            res.send({ message: 'OTP did not match, please try again!'})
        }
    })
    }


exports.signin = (req, res) => {

 const { phoneNumber} = req.body

User.findOne({ phoneNumber: req.body.phoneNumber}, (error, user,) => {
  if (user) {
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp;
    user.expireIn = new Date().getTime() + 300*1000;
   
    user.save(err => {
        if(err)  {
            res.send(err)
        } else {
            res.status(200).send({ phoneNumber, otp, });
    }
    })
            // client.messages
            // .create({
            // 	body: `Your One Time Password is ${otp}`,
            // 	from: twilioNum,
            // 	to: phoneNumber
            // })
            // .then((messages) => console.log(messages))
            // .catch((err) => console.error(err));
            // const otpData = new User({
            //         phoneNumber: phoneNumber,
            //         otp: otp,
            //         expireIn: new Date().getTime() + 300*1000,
            // }) 
            }         
     else {
        res.send({message: "User not registered, please register"})
     }
    })
}

exports.verifySigninOtp =  (req, res) =>   {

    const {otp} = req.body

    User.findOne({otp: otp}, (err, user) => {
        if(user){

            let currentTime = new Date().getTime();
            let diff = User.expireIn - currentTime;
            if(diff < 0){
            res.send({message: 'OTP expired, please try again.'})
            }else {
            res.send({message: "OTP verified!", user: user})
        } 
            
        }
        else {
            res.send({ message: 'Failed to verify OTP'})
        }
    })

}

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


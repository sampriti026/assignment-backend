const express = require("express");
const { signup, signin, } = require("../controller/auth");
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');
const router = express.Router();
const {verifyOtp} = require("../controller/auth");
const {verifySigninOtp} = require("../controller/auth");


router.post('/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/verifyOtp', verifyOtp);
router.post('/signin',validateSigninRequest, isRequestValidated, signin);
router.post('/verifySigninOtp', verifySigninOtp);

module.exports = router;
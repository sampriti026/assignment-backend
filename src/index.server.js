const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const app = express();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
//const client = require('twilio')(accountSid, authToken);

const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;

const sms = process.env.SMS_SECRET;

//routes
const authRoutes = require("./routes/auth");



//environment variable
env.config();

app.use(express.json())

app.use("/api", authRoutes);


mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.rls6a.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    ).then(() => {
        console.log('connected')
    });

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
      });







//let refreshTokens = [];

// const app = express();
// app.use(express.json());


// app.post('/sendOTP', (req, res) => {
// 	const phone = req.body.phone;
// 	const otp = Math.floor(100000 + Math.random() * 900000);
// 	const ttl = 2 * 60 * 1000;
// 	const expires = Date.now() + ttl;
// 	const data = `${phone}.${otp}.${expires}`;
// 	const hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');
// 	const fullHash = `${hash}.${expires}`;

// 	client.messages
// 		.create({
// 			body: `Your One Time Login Password For CFM is ${otp}`,
// 			from: twilioNum,
// 			to: phone
// 		})
// 		.then((messages) => console.log(messages))
// 		.catch((err) => console.error(err));

// 	// res.status(200).send({ phone, hash: fullHash, otp });  // this bypass otp via api only for development instead hitting twilio api all the time
// 	res.status(200).send({ phone, otp });          // Use this way in Production
// });
// app.listen(4000);

// app.post('/verifyOTP', (req, res) => {
// 	const phone = req.body.phone;
// 	const hash = req.body.hash;
// 	const otp = req.body.otp;
// 	let [ hashValue, expires ] = hash.split('.');

// 	let now = Date.now();
// 	if (now > parseInt(expires)) {
// 		return res.status(504).send({ msg: 'Timeout. Please try again' });
// 	}
// 	let data = `${phone}.${otp}.${expires}`;
// 	let newCalculatedHash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');
// 	if (newCalculatedHash === hashValue) {
// 		console.log('OTP verified!');
// 		// const accessToken = jwt.sign({ data: phone }, JWT_AUTH_TOKEN, { expiresIn: '30s' });
// 		// const refreshToken = jwt.sign({ data: phone }, JWT_REFRESH_TOKEN, { expiresIn: '1y' });
// 		// refreshTokens.push(refreshToken);
// 		// res
// 		// 	.status(202)
// 		// 	.cookie('accessToken', accessToken, {
// 		// 		expires: new Date(new Date().getTime() + 30 * 1000),
// 		// 		sameSite: 'strict',
// 		// 		httpOnly: true
// 		// 	})
// 		// 	.cookie('refreshToken', refreshToken, {
// 		// 		expires: new Date(new Date().getTime() + 31557600000),
// 		// 		sameSite: 'strict',
// 		// 		httpOnly: true
// 		// 	})
// 		// 	.cookie('authSession', true, { expires: new Date(new Date().getTime() + 30 * 1000), sameSite: 'strict' })
// 		// 	.cookie('refreshTokenID', true, {
// 		// 		expires: new Date(new Date().getTime() + 31557600000),
// 		// 		sameSite: 'strict'
// 		// 	})
// 		// 	.send({ msg: 'Device verified' });
// 	} else {
// 		console.log('not authenticated');
// 		return res.status(400).send({ verification: false, msg: 'Incorrect OTP' });
// 	}
// });


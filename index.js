
require("dotenv").config();
const express = require("express");
//const signup = require("./routes/signup"); // Import the test routes
//const serverless = require("serverless-http"); // For serverless deployment on Vercel
const app = express();
app.use(express.json());
const db = require("./config/database");
//const { signupcontroller } = require("./controller/signupcontroller");

db.connect();


//const PORT = 2000;
// Middleware to parse JSON requests
app.post("/signup", signupcontroller);
app.get("/", (req, res) => {
    res.send("Welcome to Agro 360 v3");
});
console.log("Signup Controller:", signupcontroller);
// Register test routes


app.listen(process.env.PORT, () => {
    console.log("App is running on port")
})

const signupcontroller = async (req, res) => {
    try {
        console.log("Signup request received:", req.body);

        const { mobNumber } = req.body;

        // Check if user already exists
        const existingUser = await USER.findOne({ mobNumber });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists try login with pin' });
        }

        res.status(200).json({
            message: 'Processing OTP request. Please check your phone soon.',
            mobNumber,
        });
        // Generate OTP and expiration time
        const { otp, expiresAt } = generateOtp();

        // Store OTP temporarily (Use Redis in production)
        otpStorage[mobNumber] = { otp, expiresAt };


        // Send OTP
        await sendOtp(mobNumber, otp);

        // Return success response
        return res.status(200).json({
            message: 'OTP sent successfully. Please check your phone.',
            mobNumber,  // Return the mobile number (to verify OTP later)
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};
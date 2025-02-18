const { USER } = require('../model/usermodel');
const crypto = require('crypto');
const axios = require('axios');
const otpStorage = {};  // Temporary in-memory OTP storage (You can replace this with Redis)

const generateOtp = (mobNumber) => {
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);  // OTP expires in 5 minutes
    return { otp, expiresAt };
};

const sendOtp = async (mobNumber, otp) => {
    const url = 'https://www.fast2sms.com/dev/bulkV2';
    const authorizationToken = 'il3UKqldKVCfbt0QAHUXC3c3BELxZEDkUOgo6sJZVbLLDU9C1GJ75RG6H0sW';

    const params = {
        authorization: authorizationToken,
        route: 'otp',
        variables_values: otp,
        numbers: mobNumber,
    };

    try {
        const response = await axios.get(url, { params });
        if (response.status !== 200) {
            throw new Error('Failed to send OTP');
        }
    } catch (error) {
        console.error('Error sending OTP via Fast2SMS:', error);
        throw new Error('Error sending OTP');
    }
};

// Signup Controller (Generate OTP, send to user, and store temporarily)
exports.signupController = async (req, res) => {
    try {
        const { name, mobNumber, state, district, taluka, village } = req.body;

        // Check if user already exists
        const existingUser = await USER.findOne({ mobNumber });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate OTP and expiration time
        const { otp, expiresAt } = generateOtp(mobNumber);

        // Store OTP temporarily (You can use Redis instead)
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


// OTP Verification Controller
exports.verifyOtpController = async (req, res) => {
    try {
        const { mobNumber, otp } = req.body;

        // Check if OTP exists in memory (this is where Redis would come in for better persistence)
        const storedOtpData = otpStorage[mobNumber];

        if (!storedOtpData) {
            return res.status(400).json({ message: 'OTP not generated or expired' });
        }

        // Check if OTP has expired
        if (new Date() > storedOtpData.expiresAt) {
            delete otpStorage[mobNumber];  // Delete expired OTP
            return res.status(400).json({ message: 'OTP has expired' });
        }

        // Verify OTP
        if (storedOtpData.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // OTP is correct and not expired, now save user to the database
        const newUser = new USER({
            name: req.body.name,
            mobNumber,
            state: req.body.state,
            district: req.body.district,
            taluka: req.body.taluka,
            village: req.body.village,
        });

        await newUser.save();

        // OTP verification success
        delete otpStorage[mobNumber];  // Clean up OTP after successful verification

        return res.status(200).json({
            message: 'OTP verified successfully. User registered.',
            userId: newUser._id,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};

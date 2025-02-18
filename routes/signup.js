const express = require("express");
const router = express.Router();
const { signupController, verifyOtpController } = require("../controller/signupcontroller");
// Define a GET route for /test
router.post("/signup", signupController);
router.post("/verifyotp", verifyOtpController);

module.exports = router; // Export the router to be used in index.js

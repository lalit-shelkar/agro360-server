const express = require("express");
const router = express.Router();
const { signupController, verifyOtpController, loginController } = require("../controller/signupcontroller");
// Define a GET route for /test
router.post("/signup", signupController);
router.post("/verifyotp", verifyOtpController);
router.post("/login", loginController);

module.exports = router; // Export the router to be used in index.js

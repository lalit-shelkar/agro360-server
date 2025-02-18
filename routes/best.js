const express = require("express");
const router = express.Router();
const { signup } = require("../controller/User");
// Define a GET route for /test
router.get("/best", signup);


router.get("/best1", (req, res) => {
    return res.json({
        success: true,
        message: "Server is up and running! best1 route working fine.",
    });
});

module.exports = router; // Export the router to be used in index.js

const express = require("express");
const router = express.Router();

// Define a GET route for /test
router.get("/best", (req, res) => {
    return res.json({
        success: true,
        message: "Server is up and running! best route working fine.",
    });
});

router.get("/best1", (req, res) => {
    return res.json({
        success: true,
        message: "Server is up and running! best1 route working fine.",
    });
});

module.exports = router; // Export the router to be used in index.js

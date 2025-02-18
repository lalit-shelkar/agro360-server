const express = require("express");
const router = express.Router();

// Define a GET route for /test
router.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Server is up and running! Test route working fine.",
    });
});

module.exports = router; // Export the router to be used in index.js

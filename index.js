const express = require("express");
//const signup = require("./routes/signup"); // Import the test routes
//const serverless = require("serverless-http"); // For serverless deployment on Vercel
const app = express();
const db = require("./config/database");
const { signupcontroller } = require("./controller/signupcontroller");

db.connect();
require("dotenv").config();

const PORT = 2000;
app.use(express.json()); // Middleware to parse JSON requests

app.get("/", (req, res) => {
    res.send("Welcome to Agro 360 v2");
});

// Register test routes
app.post("/signup", signupcontroller);

app.listen(PORT, () => {
    console.log("App is running")
})


const express = require("express");
//const signup = require("./routes/signup"); // Import the test routes
//const serverless = require("serverless-http"); // For serverless deployment on Vercel
const app = express();
const db = require("./config/database");
const { signupController } = require("./controller/signupcontroller");
db.connect();
require("dotenv").config();

const { PORT } = process.env;
app.use(express.json()); // Middleware to parse JSON requests

// Register test routes
app.use("/signup", signupController);

app.listen(PORT, () => {
    console.log("App is running")
})

//module.exports = app; 
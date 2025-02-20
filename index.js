
require("dotenv").config();
const express = require("express");
//const signup = require("./routes/signup"); // Import the test routes
//const serverless = require("serverless-http"); // For serverless deployment on Vercel
const app = express();
app.use(express.json());
const db = require("./config/database");
const { signupcontroller } = require("./controller/signupcontroller");

db.connect();


//const PORT = 2000;
// Middleware to parse JSON requests

app.get("/", (req, res) => {
    res.send("Welcome to Agro 360 v3");
});
console.log("Signup Controller:", signupcontroller);
// Register test routes
app.post("/signup", signupcontroller);

app.listen(process.env.PORT, () => {
    console.log("App is running on port")
})


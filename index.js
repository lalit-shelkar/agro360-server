const express = require("express");
const signup = require("./routes/signup"); // Import the test routes
//const serverless = require("serverless-http"); // For serverless deployment on Vercel
const app = express();
const db = require("./config/database");
db.connect();

app.use(express.json()); // Middleware to parse JSON requests

// Register test routes
app.use("/", signup);

app.listen(3000, () => {
    console.log("App is running")
})
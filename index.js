const express = require("express");
const testRoutes = require("./routes/test"); // Import the test routes
//const serverless = require("serverless-http"); // For serverless deployment on Vercel
const app = express();

app.use(express.json()); // Middleware to parse JSON requests

// Register test routes
app.use("/", testRoutes);  // Routes will be prefixed with /test
app.use("/", testRoutes);  // Routes will be prefixed with /test


// Export the app as a serverless function
//module.exports.handler = serverless(app);
app.listen(3000, () => {
    console.log("App is running")
})
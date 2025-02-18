const express = require("express");
const testRoutes = require("./routes/test"); // Import the test routes
const serverless = require("serverless-http"); // For serverless deployment on Vercel
const app = express();

app.use(express.json()); // Middleware to parse JSON requests

// Register test route at the root level
app.use("/", testRoutes);

// Export the app as a serverless function
module.exports = serverless(app);

const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//database connection
const database = require("./config/database");
database.connect();

const PORT = process.env.PORT || 4000;
app.use(express.json());

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running ...",
    });
});

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
});
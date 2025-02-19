const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URL = "mongodb+srv://lalitshelkar24:agro360@cluster1.6dkom.mongodb.net/";

exports.connect = () => {
    mongoose
        .connect(MONGODB_URL)
        .then(console.log(`DB Connection Success`))
        .catch((err) => {
            console.log(`DB Connection Failed`);
            console.log(err);
            process.exit(1);
        });
};

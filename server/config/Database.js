const mongoose = require("mongoose");
require("dotenv").config();

const connectDatabase = () => {
    mongoose
        .connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((data) => {
            console.log(`Database connected Successfully`);
        })
        .catch((err) => {
            console.log("Database connection failed ",err);
            process.exit(1);
        });
};

module.exports = connectDatabase;
const express = require("express");
const app = express();
const cors=require("cors");
const cookieParser=require("cookie-parser");

require("dotenv").config();

//All Routes
const userRoutes = require("./routes/User");
const taskRoutes = require("./routes/taskRoutes");

//Middlewares
app.use(express.json());
app.use(cookieParser());

//all the request coming from this localhost you should entertain that
app.use(
    cors({
        origin:"*",
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        credentials:true,
    })
)

//Database Connection
const dbConnection = require("./config/Database");
dbConnection();

//Routes Mounting
app.use("/api/auth", userRoutes);
app.use("/api/task", taskRoutes);


app.listen(process.env.PORT||5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

const express = require('express')
const app = express();
require("dotenv").config();
const main = require("./config/db");
const cookieParser = require('cookie-parser');
const authRouter = require("./routes/userAuth");
const client = require("./config/redis");

app.use(express.json());
app.use(cookieParser());
app.use("/user", authRouter);

const InitializeConnection = async() => {
  try{
    await Promise.all([main(),client.connect()]);
    console.log("Connected to Database and Redis");

     app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT)
     });

  } catch(err){
      console.log("Failed to connect to Database or Redis", err);
  }
}

InitializeConnection();



const User = require("../models/user")
const validate = require("../utils/validate")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



const register = async(req,res) => {
  try{
    //validate user input

    
    validate(req.body);

   const {firstName, emailId, password} = req.body;

    req.body.password = await bcrypt.hash(password, 10);
   


   const user = await User.create(req.body);
     //send tokens
  const token = jwt.sign({_id: user._id , emailId: user.emailId},process.env.JWT_SECRET, {expiresIn: "1h"});

  res.cookie("token", token, {maxAge: 60*60*1000});

   res.status(201).send({message: "User registered successfully", user});

  }
  catch(err){
   res.status(400).send("Error: " +err.message);
  }
}

const login = async(req, res) => {
  try{
     const {emailId, password} = req.body;
     if(!emailId) {
      throw new Error("Invalid credentials");
     }

      if(!password) {
      throw new Error("Invalid credentials");

     } 
    const user = await User.findOne({emailId});

    if(!user){
      throw new Error("Invalid credentials");
    }
   const match = await bcrypt.compare(password, user.password);

   if(!match){
    throw new Error("Invalid credentials");
   }

    const token = jwt.sign({_id: user._id , emailId: user.emailId},process.env.JWT_SECRET, {expiresIn: "1h"});

  res.cookie("token", token, {maxAge: 60*60*1000});

  res.status(200).send({message: "User logged in successfully", user});



  } catch (err){
    res.status(400).send("Error: " + err.message);
  }
}

const logout =  async (req, res) => {
  try{
    //validate the token by using the middleware 

    const {token} = req.cookies;
    const payload = jwt.decode(token);
    await client.set(`token:${token}`, "Blocked")
    await client.expiresA(`token:${token}`, payload.exp);


    // add token to redis block list
    // cokkies ko clear kr diyo

    res.cookie("token", null, {expires: new Date(Date.now())})

    res.send ("Logged Out Successfully");

  } catch (err){
   res.status(400).send("Error: " + err.message);

  }
}


module.exports = {register, login, logout};

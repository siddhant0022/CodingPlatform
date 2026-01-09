const User = require("../models/user")
const validate = require("../utils/validate")


const register = async(req,res) => {
  try{

    validate(req.body);

   const {firstname, email, password} = req.body;


   const user = await User.create(req.body);
  }
  catch(err){
   res.status(400).send("Error: " +err.message);
  }
}
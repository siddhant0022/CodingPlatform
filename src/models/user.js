const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
  firstName:{
    type: String,
    reuired: true,
    minLength: 3,
    maxLength: 20
  },
  lastName:{
    type: String,
    reuired: true,
    minlength: 3,
    maxLength: 20
  },
  emailId:{
    type: String,
    reuired: true,
    unique: true,
    trim: true,
    lowercase: true,
    immutable: true,

  },
  age:{
    type: Number,
    required: true,
    min: 6,
    max: 80,
  },
  role:{
    type: String,
    enum: ["admin", "user"],
    default: "user",

  },
  problemSolved:{
    type: [String]
  },
  password:{
    type: String,
    required: true,
    minLength: 8,
  }
  },{
    timestamps: true
  }
)

const User = mongoose.model("user", userSchema);

module.exports = User;

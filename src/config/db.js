const mongoose = require("mongoose");
require("dotenv").congif();

async function main() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log("Connected to MongoDB")

}
module.exports = main;
main().catch((err) => console.log(err));
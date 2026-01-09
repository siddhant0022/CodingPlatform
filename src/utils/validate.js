const validator = require("validator");

const validate = (data) => {
 const mandatoryField = ["firstname", "email", "password"];
 const isAllowed = mandatoryField.every((k) => Object.keys(data).includes(k));
 if (!isAllowed) {
   throw new Error("Misssing mandatory fields");
 }

 if (!validator.isEmail(data.email)) {
    throw new Error(" Inavalid Email");
 }

 if (!validator.isStrongPassword(data.password)){
  throw new Error("Password is not strong enough");
 }
}

module.exports = validate;

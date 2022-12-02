const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

// Create a static method for hash the password (more security)
userSchema.statics.hashPassword = async function (passwordText) {
  return await bcrypt.hash(passwordText, 7);
};

// Create an instance method for compare the password in DB with the login password
userSchema.methods.comparePasswords = async function (loginPassword) {
  return await bcrypt.compare(loginPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;

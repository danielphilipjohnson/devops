const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Token = require("./Token");
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env;


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [
      true, "can't be blank"
    ],
    match: [
      /^[a-zA-Z0-9]+$/, 'is invalid'
    ],
    index: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [
      true, "can't be blank"
    ],
    match: [
      /\S+@\S+\.\S+/, 'is invalid'
    ],
    index: true
  },
  bio: String,
  image: String
}, {timestamps: true});


// define schema level methods to create access token and refresh token:
userSchema.methods = {
  createAccessToken: async function () {
    try {
      let {_id, username} = this;
      let accessToken = jwt.sign({
        user: {
          _id,
          username
        }
      }, ACCESS_TOKEN_SECRET, {expiresIn: "10m"});
      return accessToken;
    } catch (error) {
      console.error(error);
      return;
    }
  },
  createRefreshToken: async function () {
    try {
      let {_id, username} = this;
      let refreshToken = jwt.sign({
        user: {
          _id,
          username
        }
      }, REFRESH_TOKEN_SECRET, {expiresIn: "1d"});

      await new Token({token: refreshToken}).save();
      return refreshToken;
    } catch (error) {
      console.error(error);
      return;
    }
  }
};


// pre save hook to hash password before saving user into the database:
userSchema.pre("save", async function (next) {
  try {
    let salt = await bcrypt.genSalt(12); // generate hash salt of 12 rounds
    let hashedPassword = await bcrypt.hash(this.password, salt); // hash the current user's password
    this.password = hashedPassword;
  } catch (error) {
    console.error(error);
  }
  return next();
});

module.exports = mongoose.model("User", userSchema);

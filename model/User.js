const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, // remove space from end & an begining if have
      required: true,
      maxlength: 35,
    },
    email: {
      type: String,
      trim: true, // remove space from end & an begining if have
      required: true,
      unique: 35,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true, // remove space from end & an begining if have
    },
    salt: String, // use to genreate hash password
    role: {
      type: Number, // 0 == user, 1== admin
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
// virtual field

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = Math.round(new Date().valueOf() * Math.random() + "");
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);

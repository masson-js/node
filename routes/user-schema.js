const { Schema, model, Types } = require('mongoose');

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      lowercase: true,
    },
    surname: {
      type: String,
      default: "",
      unique: false,
    },
    name : {
      type: String,
      default: "",
      unique: false,
    },
  }
);

const User = model("User", schema);
module.exports = User;
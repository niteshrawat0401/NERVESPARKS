const { Schema, model } = require("mongoose");

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
});

const Token = model("token", tokenSchema);
module.exports = Token;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema to use with Mongoose and MongoDB.
const usersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("users", usersSchema);

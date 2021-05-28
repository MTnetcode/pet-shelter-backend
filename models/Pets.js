const mongoose = require("mongoose");

const petsSchema = new mongoose.Schema({
  name: String,
  text: String,
  img: String,
  category: String,
});

const Pets = mongoose.model("Pet", petsSchema);
module.exports = Pets;

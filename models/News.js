const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  name: String,
  text: String,
});

const News = mongoose.model("New", newsSchema);
module.exports = News;

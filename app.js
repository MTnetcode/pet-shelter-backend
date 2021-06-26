const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connection to mongo ok`);
  })
  .catch((err) => {
    console.log(`connection to mongo failed error: ${err}`);
  });

const petsApiRoute = require("./routes/api/pets.js");
app.use("/api/pets", petsApiRoute);

const newsApiRoute = require("./routes/api/news.js");
app.use("/api/news", newsApiRoute);

const authRoute = require("./routes/api/auth.js");
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});

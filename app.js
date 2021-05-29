const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});

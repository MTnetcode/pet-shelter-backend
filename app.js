const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const petsApiRoute = require("./routes/api/pets.js");
app.use("/api/pets", petsApiRoute);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});

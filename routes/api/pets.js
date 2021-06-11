const express = require("express");
const router = express.Router();
const multer = require("multer");
const Pets = require("../../models/Pets.js");
let upload = multer({
  dest: "public/images",
});

router.get("/", (req, res) => {
  Pets.find({}, (err, foundPets) => {
    if (err) {
      res.json({ err });
    }
    if (!foundPets) {
      res.json({ foundPets: "no pet found" });
    } else {
      res.json({ foundPets });
    }
  });
});

router.get("/:category", (req, res) => {
  const { category } = req.params;
  if (category !== "dogs" && category !== "cats") {
    res.json({ err: "category which you have specified is not valid" });
  } else {
    Pets.find({ category }, (err, foundPets) => {
      if (err) {
        res.json({ err });
      }
      if (!foundPets) {
        res.json({ foundPets: "no pet found" });
      } else {
        res.json({ foundPets });
      }
    });
  }
});

router.post("/", upload.single("img"), (req, res) => {
  const { name, text, category } = req.body;
  const img = `http://petshelter-api.mtnetcode.com/images/${req.file.filename}`;
  const newPet = new Pets({ name, text, category, img });
  newPet
    .save()
    .then((savedPet) => {
      res.json({ msg: `successfully saved new pet ${name}`, savedPet });
    })
    .catch((err) => {
      res.json({ err });
    });
});

module.exports = router;

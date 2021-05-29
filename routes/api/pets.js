const express = require("express");
const router = express.Router();
const Pets = require("../../models/Pets.js");

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

router.post("/", (req, res) => {
  console.log(req.body);
  const { name, text, img, category } = req.body;
  const newPet = new Pets({ name, text, img, category });
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

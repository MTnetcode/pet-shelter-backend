const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const Pets = require("../../models/Pets.js");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @summary provides authentication check to post and delete routes, if user is authenticated go next
 */
const protectRoute = (req, res, next) => {
  if (!req.headers.authorization) {
    res.json({ err: "no authorization header was send" });
  } else {
    const token = req.headers.authorization.split(" ")[1];
    if (token === null) {
      res.json({ err: "authorization header was sent but no token provided" });
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.json({ err: "invalid token" });
        } else {
          if (!decoded) {
            res.json({ err: "token could not be decoded" });
          } else {
            next();
          }
        }
      });
    }
  }
};

let upload = multer({
  dest: "public/images",
});

router.get("/", (req, res) => {
  Pets.find({}, (err, foundPets) => {
    if (err) {
      res.json({ err });
    }
    if (foundPets.length < 1) {
      res.json({ err: "no pet found" });
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

router.post("/", protectRoute, upload.single("img"), (req, res) => {
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

router.delete("/:id", protectRoute, (req, res) => {
  const { id } = req.params;
  if (id !== undefined) {
    Pets.findByIdAndDelete(id, (err, deleted) => {
      if (err) {
        res.json({ err: "could not delete post, specified id does not exist" });
      } else {
        res.json({ msg: "successfully deleted post" });
        let fileName = deleted?.img.split("/").slice(-1)[0];
        fs.unlinkSync(`public/images/${fileName}`);
      }
    });
  } else {
    res.json({ err: "no id provided" });
  }
});

router.patch("/", protectRoute, upload.none(), (req, res) => {
  console.log(req);
  const { id, name, text } = req.body;
  if (id !== undefined) {
    Pets.findByIdAndUpdate(id, {
      name,
      text,
    })
      .then((updated) => res.json({ msg: "successfully updated pet", updated }))
      .catch((err) => res.json({ err }));
  }
});

module.exports = router;

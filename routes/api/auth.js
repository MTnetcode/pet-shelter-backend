const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/Users.js");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.json({ err });
    } else {
      if (!foundUser) {
        res.json({ err: "No user with specified username" });
      } else {
        bcrypt.compare(password, foundUser.password, (err, isMatch) => {
          if (err) {
            res.json({ err });
          } else {
            if (!isMatch) {
              res, json({ err: "incorrect password, please try again" });
            } else {
              const payload = {
                _id: foundUser._id,
                username: foundUser.username,
                role: foundUser.role,
              };
              const token = jwt.sign(payload, process.env.JWT_SECRET);
              res.json({ token });
            }
          }
        });
      }
    }
  });
});

router.post("/register", (req, res) => {
  const { username, password, role } = req.body;
  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.json({ err });
    } else {
      if (foundUser) {
        res.json({ err: "User with given username already exists" });
      } else {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            res.json({ err });
          } else {
            const newUser = new User({
              username,
              password,
              role,
            });
            newUser
              .save()
              .then((user) => {
                res.json({
                  success: "new user successfully created",
                  user,
                });
              })
              .catch((err) => {
                res.json({ err });
              });
          }
        });
      }
    }
  });
});

module.exports = router;

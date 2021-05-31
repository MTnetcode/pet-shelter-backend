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
        res.json({ msg: "No user with specified username" });
      } else {
        bcrypt.compare(password, foundUser.password, (err, isMatch) => {
          if (err) {
            res.json({ err });
          } else {
            if (!isMatch) {
              res, json({ msg: "incorrect password, please try again" });
            } else {
              const payload = {
                _id: foundUser._id,
                username: foundUser.username,
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

module.exports = router;

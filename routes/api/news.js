const express = require("express");
const News = require("../../models/News.js");
const router = express.Router();

router.get("/", (req, res) => {
  News.find({}, (err, foundNews) => {
    if (err) {
      res.json({ err });
    } else {
      if (foundNews.length < 1) {
        res.json({ err: "no news found" });
      } else {
        res.json({ foundNews });
      }
    }
  });
});

module.exports = router;

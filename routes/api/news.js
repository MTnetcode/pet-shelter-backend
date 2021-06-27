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

router.post("/", (req, res) => {
  const { title, text } = req.body;
  const addNews = new News({
    title,
    text,
  });
  addNews
    .save()
    .then(() => {
      res.json({ msg: `successfully saved new post with title ${title}` });
    })
    .catch((err) => {
      res.json({ err });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  News.findByIdAndDelete(id, (err, deleted) => {
    if (err) res.json({ err });
    res.json({
      msg: `successsfully deleted post with title ${deleted?.title}`,
    });
  });
});

module.exports = router;

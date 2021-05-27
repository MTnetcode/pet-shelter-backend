const express = require("express");
const router = express.Router();

router.get("/pets", (req, res) => {
  res.json({ data: "test" });
});

module.exports = router;

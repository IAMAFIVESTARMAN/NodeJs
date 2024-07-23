const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  //   res.send("Hello World");
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
});
router.get("/test(.html)?", (req, res) => {
  //   res.send("Hello World");
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "test.html"));
});
module.exports = router;

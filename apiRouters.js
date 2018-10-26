var express = require('express');
var router = express.Router();

router.route("/").get(function (req, res) {
  console.log("This is called");
})

router.route("/log2").get(function (req, res) {
  console.log("log2 called");
})
module.exports = router;

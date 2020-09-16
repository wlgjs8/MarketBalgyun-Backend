var express = require("express");
var router = express.Router();
const User = require("../models/User");

router.use(express.json());

router.get("/", async (req, res) => {
  const userTemp = await User.find({ ID: "0001" });
  userJson = JSON.stringify(userTemp);
  console.log(userJson);

  return res.json(customerDB);
});

router.post("/", (req, res) => {
  req.body.phone = "2222";
  res.send(customerDB);
  // console.log(m)
});

module.exports = router;

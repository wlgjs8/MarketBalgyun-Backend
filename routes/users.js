var express = require("express");
var router = express.Router();
const User = require("../models/User");

router.use(express.json());

router.get("/", async (req, res) => {
  req.body.postPhone = "01021492222";
  const postPhone = req.body.postPhone;

  // const userTemp = await Customers.find({ phone: postPhone });
  // const userTemp = await User.find({ phone: postPhone });
  userJson = JSON.stringify(Customers);
  res.send(userJson);
});

module.exports = router;

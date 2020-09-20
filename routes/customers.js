var express = require("express");
var router = express.Router();
const Customer = require("../models/Customer");
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const postPhone = req.query.postPhone;
    const userTemp = await Customer.findOne({ phone: postPhone });

    userJson = JSON.stringify(userTemp);
    res.send(userJson);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.post("/", (req, res) => {
  console.log("HELLO POST");
});

module.exports = router;

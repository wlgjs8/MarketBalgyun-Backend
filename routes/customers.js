var express = require("express");
var router = express.Router();
const Customer = require("../models/Customer");

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    // req.query.postPhone = "01021492222";
    // const postPhone = req.query.postPhone;

    const userTemp = await Customer.find({ name: "손예진" });

    userJson = JSON.stringify(userTemp);
    res.send(userJson);
    console.log(userJson);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.post("/", (req, res) => {
  //Write schema from req.body
  console.log("HELLO POST");
});

module.exports = router;

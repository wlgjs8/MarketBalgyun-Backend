var express = require("express");
var router = express.Router();
const Customer = require("../models/Customer");
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const postPhone = req.query.phone;
    const userTemp = await Customer.find({
      phone: { $regex: postPhone + "$" },
    });
    if (userTemp.length != 0) {
      userJson = JSON.stringify(userTemp);
      res.send(userJson);
    } else {
      res.send("No Customer");
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.post("/", (req, res) => {
  try {
    Customer.insertMany([req.body]);
    res.send("Posting Success");
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

module.exports = router;

var express = require("express");
var router = express.Router();
const Customer = require("../models/Customer");
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const postPhone = req.query.phone;
    const customerTemp = await Customer.find({
      phone: { $regex: postPhone + "$" },
    });
    if (customerTemp.length != 0) {
      customerJson = JSON.stringify(customerTemp);
      res.send(customerJson);
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

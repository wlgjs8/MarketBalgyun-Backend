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
  setCustomerInfo(req);
  res.send("Posting Success");
});

function setCustomerInfo(req) {
  const customerInfo = ({
    name,
    phone,
    taste,
    boolSMS,
    boolLecture,
    likeCategory,
    something,
    email,
    birthday,
    gender,
    address,
    mainNumber,
    point,
  } = req.body);
  Customer.insertMany([customerInfo]);
}

module.exports = router;

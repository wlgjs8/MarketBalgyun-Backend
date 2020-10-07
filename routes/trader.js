var express = require("express");
var router = express.Router();
const Trader = require("../models/Trader");
const { isVerified } = require('./middlewares');

router.get("/", isVerified, async (req, res) => {
  try {
    const traderName = req.query.name;
    const traderTemp = await Trader.find({
      name: traderName,
    });
    if (traderTemp.length != 0) {
      traderJson = JSON.stringify(traderTemp);
      res.send(traderJson);
    } else {
      res.send("No Trader");
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.post("/", isVerified, (req, res) => {
  try {
    Trader.insertMany([req.body]);
    res.send("Posting Success");
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.delete("/", isVerified, (req, res) => {
  Trader.deleteOne({ name: req.query.name }, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
})

module.exports = router;

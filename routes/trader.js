var express = require("express");
var router = express.Router();
const Trader = require("../models/Trader");

router.get("/", async (req, res) => {
  try {
    const postName = req.query.name;
    const traderTemp = await Trader.find({
      name: postName,
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

router.post("/", (req, res) => {
  try {
    Trader.insertMany([req.body]);
    res.send("Posting Success");
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

module.exports = router;

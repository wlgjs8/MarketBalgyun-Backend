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

router.put("/", isVerified, async (req, res) => {
  try {
    let traderName = req.body.name;

    // trader_number
    if (req.body.trader_number) {
      Trader.update(
        { name: traderName },
        { $set: { trader_number: req.body.trader_number } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    if (req.body.CEO) {
      Trader.update(
        { name: traderName },
        { $set: { CEO: req.body.CEO } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    if (req.body.business) {
      Trader.update(
        { name: traderName },
        { $set: { business: req.body.business } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    if (req.body.business_item) {
      Trader.update(
        { name: traderName },
        { $set: { business_item: req.body.business_item } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    if (req.body.phone) {
      Trader.update(
        { name: traderName },
        { $set: { phone: req.body.phone } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    if (req.body.mobile_phone) {
      Trader.update(
        { name: traderName },
        { $set: { mobile_phone: req.body.mobile_phone } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    if (req.body.email) {
      Trader.update(
        { name: traderName },
        { $set: { email: req.body.email } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    if (req.body.site) {
      Trader.update(
        { name: traderName },
        { $set: { site: req.body.site } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    if (req.body.post) {
      Trader.update(
        { name: traderName },
        { $set: { post: req.body.post } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    if (req.body.address) {
      Trader.update(
        { name: traderName },
        { $set: { address: req.body.address } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    if (req.body.staff) {
      Trader.update(
        { name: traderName },
        { $set: { staff: req.body.staff } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    if (req.body.bank) {
      Trader.update(
        { name: traderName },
        { $set: { bank: req.body.bank } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    if (req.body.account) {
      Trader.update(
        { name: traderName },
        { $set: { account: req.body.account } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    if (req.body.account_owner) {
      Trader.update(
        { name: traderName },
        { $set: { account_owner: req.body.account_owner } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    if (req.body.fee) {
      Trader.update(
        { name: traderName },
        { $set: { fee: req.body.fee } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }

    const traderTemp = await Trader.find({
      name: traderName,
    });
    res.send(traderTemp);

  } catch (error) {
    console.log(error);
    return error;
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

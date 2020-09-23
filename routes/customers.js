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

router.put("/", async (req, res) => {
  try {
    let customerPhone = req.body.phone;

    //name
    if (req.body.name) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { name: req.body.name } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    //taste
    if (req.body.taste) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { taste: req.body.taste } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    //boolSMS
    if (req.body.boolSMS) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { boolSMS: req.body.boolSMS } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // boolLecture
    if (req.body.boolLecture) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { boolLecture: req.body.boolLecture } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // likeCategory
    if (req.body.likeCategory) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { likeCategory: req.body.likeCategory } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // something
    if (req.body.something) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { something: req.body.something } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // email
    if (req.body.email) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { email: req.body.email } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // birthday
    if (req.body.birthday) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { birthday: req.body.birthday } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // Gender
    if (req.body.gender) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { gender: req.body.gender } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // address
    if (req.body.address) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { address: req.body.address } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // mainNumber
    if (req.body.mainNumber) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { mainNumber: req.body.mainNumber } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // point
    if (req.body.point) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { point: req.body.point } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    const customerTemp = await Customer.find({
      phone: req.body.phone,
    });
    res.send(customerTemp);

  } catch (error) {
    console.log(error);
    return error;
  }
});

router.delete("/", (req, res) => {
  Customer.deleteOne({ phone: req.query.phone }, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
});

module.exports = router;

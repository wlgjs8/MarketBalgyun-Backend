var express = require("express");
var router = express.Router();
const User = require("../models/User");

router.use(express.json());

// User.insertMany([
//   { name: "0000", password: "0000", level: "1234" },
//   { name: "0001", password: "1111", level: "2345" },
//   { name: "0002", password: "2222", level: "3456" },
//   { name: "0003", password: "3333", level: "4567" },
// ]);

router.get("/", async (req, res) => {
  try {
    const userName = req.query.name;
    const userTemp = await User.find({
      name: userName,
    });
    if (userTemp.length != 0) {
      userJson = JSON.stringify(userTemp);
      res.send(userJson);
    } else {
      res.send("No User");
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.post("/", (req, res) => {
  try {
    User.insertMany([req.body]);
    res.send("Posting Success");
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.put("/", async (req, res) => {
  try {
    let userName = req.body.name;

    // if (userTemp.length != 0) {
    if (req.body.password) {
      console.log("req.body.password : " + req.body.password);
      User.update(
        { name: userName },
        { $set: { password: req.body.password } }
      );
    }
    if (req.body.level) {
      console.log("req.body.level : " + req.body.level);
      User.update({ name: userName }, { $set: { level: req.body.level } });
    }
    const userTemp = await User.find({
      name: userName,
    });
    res.send(userTemp);

    // } else {
    //   res.send("해당 이름의 사용자가 없습니다.");
    // }
  } catch (error) {
    console.log(error);
    return error;
  }
});

router.delete("/", (req, res) => {
  User.deleteOne({ name: req.query.name }, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
});

module.exports = router;

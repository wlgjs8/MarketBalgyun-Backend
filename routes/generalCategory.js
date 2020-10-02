var express = require("express");
var mergeJSON = require("merge-json");
var router = express.Router();
const jwt = require('jsonwebtoken');

const FirstCategory = require("../models/products/FirstCategory");
const SecondCategory = require("../models/products/SecondCategory");
const ThirdCategory = require("../models/products/ThirdCategory");
const GeneralProduct = require("../models/products/GeneralProduct");
const { isVerified } = require('./middlewares');
router.use(express.json());

// 전체 카테고리 GET
router.get("/", async (req, res) => {
  try {
    const firstTemp = await FirstCategory.find();
    const secondTemp = await SecondCategory.find();
    const thirdTemp = await ThirdCategory.find();

    var firstTemp_Nickname = {
      first_category: firstTemp,
    };
    var secondTemp_Nickname = {
      second_category: secondTemp,
    };
    var thirdTemp_Nickname = {
      third_category: thirdTemp,
    };

    var resultTemp = mergeJSON.merge(firstTemp_Nickname, secondTemp_Nickname);
    var resultJson = mergeJSON.merge(resultTemp, thirdTemp_Nickname);

    res.send(resultJson);
    // console.log('verified');
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// 카테고리 삭제시 Showable 변경
/*
router.put("/", async (req, res) => {
  var firstCategoryID = req.body.id.substring(0, 2);
  var secondCategoryID = req.body.id.substring(0, 4);
  var thirdCategoryID = req.body.id.substring(0, 6);

  if (req.body.first_show != null) {
    FirstCategory.updateOne(
      { ID: firstCategoryID },
      { $set: { Showable: req.body.first_show } },
      function (err, res) {
        if (err) throw err;
      }
    );
  }
  if (req.body.second_show != null) {
    SecondCategory.updateOne(
      { ID: secondCategoryID },
      { $set: { Showable: req.body.second_show } },
      function (err, res) {
        if (err) throw err;
      }
    );
  }
  if (req.body.third_show != null) {
    ThirdCategory.updateOne(
      { ID: thirdCategoryID },
      { $set: { Showable: req.body.third_show } },
      function (err, res) {
        if (err) throw err;
      }
    );
  }
  res.send(thirdCategoryID);
});
*/

module.exports = router;

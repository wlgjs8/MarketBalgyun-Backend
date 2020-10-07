var express = require("express");
var mergeJSON = require("merge-json");
var router = express.Router();
const jwt = require('jsonwebtoken');

const FirstCategory = require("../models/products/FirstCategory");
const SecondCategory = require("../models/products/SecondCategory");
const ThirdCategory = require("../models/products/ThirdCategory");
const { isVerified } = require('./middlewares');
router.use(express.json());

// 전체 카테고리 GET
router.get("/", isVerified, async (req, res) => {
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
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

module.exports = router;

var express = require("express");
var mergeJSON = require("merge-json");
var router = express.Router();
const FirstCategory = require("../models/categories/FirstCategory");
const SecondCategory = require("../models/categories/SecondCategory");
const ThirdCategory = require("../models/categories/ThirdCategory");

router.use(express.json());

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
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

module.exports = router;

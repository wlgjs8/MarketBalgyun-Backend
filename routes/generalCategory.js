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

    // temp1 = JSON.stringify(firstTemp);
    console.log(firstTemp);

    // console.log(
    //   JSON.stringify({ x: [10, undefined, function () {}, Symbol("")] })
    // );
    // expected output: "{"x":[10,null,null,null]}

    var resultTemp = mergeJSON.merge(firstTemp, secondTemp);
    var resultJson = mergeJSON.merge(resultTemp, thirdTemp);

    res.send(resultJson);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

module.exports = router;

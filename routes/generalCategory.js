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

router.post("/", async (req, res) => {
  // var arr0101 = ["없음", "에어컨", "히터", "공기청정기", "선풍기", "컴퓨터", "TV", "기타소형가전"]
  // var arr0102 = ["없음", "믹서기", "건조기", "핸드블랜더", "착즙기", "홍삼제조기", "샌드위치 메이커", "베이킹관련", "오븐", "포트", "기타소형가전", "에스프레소기"];
  var arr0301 = [];
  var arr0302 = [];
  var arr0401 = [];
  var arr0402 = [];
  var arr0403 = [];
  var arr0404 = [];
  var arr0501 = [];
  var arr0502 = [];
  var arr0503 = [];
  var arr = [];
  var arr = [];
  var arr = [];
  var arr = [];
  var arr = [];
  var arr = [];
  var arr = [];


  var ARR = [arr0101, arr0102]


  var i = 0;
  var index = "0101";

  var index2 = index + "0";
  while (i < arr.length) {
    if (i > 9) {
      var ThirdCategoryTemp = {
        ThirdCategory: arr[i],
        ID: index + i,
        nextID: 1,
      }
    }
    else {
      var ThirdCategoryTemp = {
        ThirdCategory: arr[i],
        ID: index2 + i,
        nextID: 1,
      }
    }
    await ThirdCategory.insertMany([ThirdCategoryTemp]);
    i++;
  }
});

module.exports = router;

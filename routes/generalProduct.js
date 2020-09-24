var express = require("express");
var router = express.Router();
const GeneralProduct = require("../models/categories/GeneralProduct");
const FirstCategory = require("../models/categories/FirstCategory");
const SecondCategory = require("../models/categories/SecondCategory");
const ThirdCategory = require("../models/categories/ThirdCategory");
const NameCategory = require("../models/categories/NameCategory");

router.use(express.json());

var fieldNum;
// NameCategory.insertMany([
//   { NameCategory: "빨간세탁기", ID: "01" },
//   { NameCategory: "검은세탁기", ID: "02" },
//   { NameCategory: "파랑공기청정기", ID: "03" },
//   { NameCategory: "노랑선풍기", ID: "04" },
// ]);

router.get("/", async (req, res) => {
  try {
    const searchID = req.query.id;
    const generalProductTemp = await GeneralProduct.find({
      id: searchID,
    });
    if (generalProductTemp.length != 0) {
      generalProductJson = JSON.stringify(generalProductTemp);
      res.send(generalProductJson);
    } else {
      res.send("No General Product");
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const searchFirstCategory = req.body.FirstCategory;
    var tempID = await setFirstCategory(searchFirstCategory);

    const searchSecondCategory = req.body.SecondCategory;
    tempID = tempID + (await setSecondCategory(searchSecondCategory));

    const searchThirdCategory = req.body.ThirdCategory;
    tempID = tempID + (await setThirdCategory(searchThirdCategory));
    // GeneralProduct.insertMany([req.body]);

    res.send(tempID);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

async function setFirstCategory(searchFirstCategory) {
  try {
    const FirstCategoryTemp = await FirstCategory.find({
      FirstCategory: searchFirstCategory,
    });
    if (FirstCategoryTemp.length != 0) {
      return FirstCategoryTemp[0].ID;
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

async function setSecondCategory(searchSecondCategory) {
  try {
    const SecondCategoryTemp = await SecondCategory.find({
      SecondCategory: searchSecondCategory,
    });
    if (SecondCategoryTemp.length != 0) {
      return SecondCategoryTemp[0].ID;
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

async function setThirdCategory(searchThirdCategory) {
  try {
    const ThirdCategoryTemp = await ThirdCategory.find({
      ThirdCategory: searchThirdCategory,
    });
    if (ThirdCategoryTemp.length != 0) {
      return ThirdCategoryTemp[0].ID;
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

function setNameCategory(fieldNum) {

}

module.exports = router;

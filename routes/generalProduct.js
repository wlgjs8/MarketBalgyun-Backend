var express = require("express");
var router = express.Router();
const GeneralProduct = require("../models/categories/GeneralProduct");
const FirstCategory = require("../models/categories/FirstCategory");
const SecondCategory = require("../models/categories/SecondCategory");
const ThirdCategory = require("../models/categories/ThirdCategory");

router.use(express.json());

// FirstCategory.insertMany([{ FirstCategory: "김지헌", ID: "09" }]);

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
  // try {
  //   //TODO
  //   const searchFirstCategory = req.body.FirstCategory;
  //   console.log("searchFirstCategory : " + searchFirstCategory);
  //   const FirstCategoryTemp = await FirstCategory.find({
  //     FirstCategory: searchFirstCategory,
  //   });
  //   // console.log("FirstCategoryTemp : " + FirstCategoryTemp.length);
  //   // FirstCategoryTemp.
  //   // FirstCategoryTemp.
  //   // const tempID = await setFirstCategory(searchFirstCategory);
  //   // tempID = tempID + (await setSecondCategory(req));
  //   // tempID = tempID + (await setThirdCategory(req));
  //   // GeneralProduct.insertMany([req.body]);
  //   // console.log("tempID : " + tempID);
  //   // json객체['key값']을 사용
  // } catch (error) {
  //   console.log(error);
  //   return next(error);
  // }
});

async function setFirstCategory(searchFirstCategory) {
  try {
    const FirstCategoryTemp = await FirstCategory.find({
      FirstCategory: searchFirstCategory,
    });
    if (FirstCategoryTemp.length != 0) {
      return FirstCategoryTemp.ID;
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

function setSecondCategory(req) {}

function setThirdCategory(req) {}

// function setNameCategory(req) {}

module.exports = router;

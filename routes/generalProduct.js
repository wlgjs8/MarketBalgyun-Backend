var express = require("express");
var router = express.Router();
const GeneralProduct = require("../models/products/GeneralProduct");
const FirstCategory = require("../models/products/FirstCategory");
const SecondCategory = require("../models/products/SecondCategory");
const ThirdCategory = require("../models/products/ThirdCategory");

router.use(express.json());

// 일반 상품 ID를 통해 검색
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

// 상품 정보 넘겨받으면, ID 생성 후 저장.
router.post("/", async (req, res) => {
  try {
    const searchFirstCategory = req.body.FirstCategory;
    var tempID = await setFirstCategory(searchFirstCategory);

    const searchSecondCategory = req.body.SecondCategory;
    tempID = tempID + (await setSecondCategory(searchSecondCategory));

    const searchThirdCategory = req.body.ThirdCategory;
    tempID = tempID + (await setThirdCategory(searchThirdCategory));

    if (req.body.name) {
      const ThirdCategoryTemp = await ThirdCategory.find({
        ID: req.body.id,
      });
      var newGeneralProductID = ThirdCategoryTemp[0].ID + ThirdCategoryTemp[0].nextID;

      // insert General Product
      // GeneralProduct.insertMany([req.body]);

      await ThirdCategory.updateOne(
        { ID: req.body.id },
        { $inc: { nextID: 1 } },
      );
    }
    res.send(newGeneralProductID);
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


router.put("/", async (req, res) => {
  try {
    let generalProductID = req.body.id;

    // first_category
    if (req.body.first_category) {
      Customer.updateOne(
        { id: generalProductID },
        { $set: { first_category: req.body.first_category } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // second_category
    if (req.body.second_category) {
      Customer.updateOne(
        { id: generalProductID },
        { $set: { second_category: req.body.second_category } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // third_category
    if (req.body.third_category) {
      Customer.updateOne(
        { id: generalProductID },
        { $set: { third_category: req.body.third_category } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // name
    if (req.body.name) {
      Customer.updateOne(
        { id: generalProductID },
        { $set: { name: req.body.name } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // cost
    if (req.body.cost) {
      Customer.updateOne(
        { id: generalProductID },
        { $set: { cost: req.body.cost } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // price
    if (req.body.price) {
      Customer.updateOne(
        { id: generalProductID },
        { $set: { price: req.body.price } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // quantity
    if (req.body.quantity) {
      Customer.updateOne(
        { id: generalProductID },
        { $set: { quantity: req.body.quantity } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // max_discount
    if (req.body.max_discount) {
      Customer.updateOne(
        { id: generalProductID },
        { $set: { max_discount: req.body.max_discount } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // place
    if (req.body.place) {
      Customer.updateOne(
        { id: generalProductID },
        { $set: { place: req.body.place } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // date
    if (req.body.date) {
      Customer.updateOne(
        { id: generalProductID },
        { $set: { date: req.body.date } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    const generalProductTemp = await GeneralProduct.find({
      id: req.body.id,
    });
    res.send(generalProductTemp);

  } catch (error) {
    console.log(error);
    return error;
  }
});

router.delete("/", (req, res) => {
  GeneralProduct.deleteOne({ id: req.query.id }, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
});


module.exports = router;

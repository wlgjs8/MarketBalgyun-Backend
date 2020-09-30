var express = require("express");
var router = express.Router();
const GeneralProduct = require("../models/products/GeneralProduct");
const FirstCategory = require("../models/products/FirstCategory");
const SecondCategory = require("../models/products/SecondCategory");
const ThirdCategory = require("../models/products/ThirdCategory");

router.use(express.json());

// 카테고리에 해당하는 상품명 GET
router.get("/", async (req, res) => {
  const searchGeneralCategoryName = await GeneralProduct.find({
    id: { $regex: "^" + req.query.third_category },
  });
  res.send(searchGeneralCategoryName);
});

// 상품 정보 넘겨받으면, ID 생성 후 저장.
router.post("/", async (req, res) => {
  var firstCategoryName = await setFirstCategory(req.body.first_category);
  var secondCategoryName = await setSecondCategory(req.body.second_category);
  var thirdCategoryName = await setThirdCategory(req.body.third_category);

  if (req.body.name) {
    const ThirdCategoryTemp = await ThirdCategory.find({
      ID: req.body.third_category,
    });
    var newGeneralProductID = ThirdCategoryTemp[0].ID + ThirdCategoryTemp[0].nextID;

    await ThirdCategory.updateOne(
      { ID: req.body.third_category },
      { $inc: { nextID: 1 } },
    );
  }
  else {
    newGeneralProductID = req.body.third_category;
  }
  var GeneralProductSchemaTemp = {
    id: newGeneralProductID,
    first_category: firstCategoryName,
    second_category: secondCategoryName,
    third_category: thirdCategoryName,
    name: req.body.name,
    cost: req.body.cost,
    price: req.body.price,
    trader: req.body.trader,
    quantity: req.body.quantity,
    max_discount: req.body.max_discount,
    place: req.body.place
  }
  GeneralProduct.insertMany([GeneralProductSchemaTemp]);
  res.send("Posting Success");
});

async function setFirstCategory(searchFirstCategory) {
  try {
    const FirstCategoryTemp = await FirstCategory.find({
      ID: searchFirstCategory,
    });
    if (FirstCategoryTemp.length != 0) {
      return FirstCategoryTemp[0].FirstCategory;
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

async function setSecondCategory(searchSecondCategory) {
  try {
    const SecondCategoryTemp = await SecondCategory.find({
      ID: searchSecondCategory,
    });
    if (SecondCategoryTemp.length != 0) {
      return SecondCategoryTemp[0].SecondCategory;
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

async function setThirdCategory(searchThirdCategory) {
  try {
    const ThirdCategoryTemp = await ThirdCategory.find({
      ID: searchThirdCategory,
    });
    if (ThirdCategoryTemp.length != 0) {
      return ThirdCategoryTemp[0].ThirdCategory;
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
    // trader
    if (req.body.trader) {
      Customer.updateOne(
        { id: generalProductID },
        { $set: { trader: req.body.trader } },
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

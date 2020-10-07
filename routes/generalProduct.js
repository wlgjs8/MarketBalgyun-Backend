var express = require("express");
var router = express.Router();
const GeneralProduct = require("../models/products/GeneralProduct");
const FirstCategory = require("../models/products/FirstCategory");
const SecondCategory = require("../models/products/SecondCategory");
const ThirdCategory = require("../models/products/ThirdCategory");
const { isVerified } = require('./middlewares');

router.use(express.json());

// 카테고리에 해당하는 상품명 GET
router.get("/", isVerified, async (req, res) => {
  const searchGeneralCategoryName = await GeneralProduct.find({
    id: { $regex: "^" + req.query.id },
  });
  res.send(searchGeneralCategoryName);
});

// 상품 정보 넘겨받으면, ID 생성 후 저장.
router.post("/", isVerified, async (req, res) => {
  let [firstCategoryName, secondCategoryName, thirdCategoryName] = await Promise.all([
    setFirstCategory(req.body.first_category),
    setSecondCategory(req.body.second_category),
    setThirdCategory(req.body.third_category)
  ]);

  if (req.body.name) {
    const nameTemp = await GeneralProduct.find({
      name: req.body.name,
    })
    if (nameTemp.length > 0) {
      res.send("해당 이름의 상품이 이미 등록되어 있습니다.");
      return;
    }
    const ThirdCategoryTemp = await ThirdCategory.findOne({
      ID: req.body.third_category,
    });
    var newGeneralProductID = ThirdCategoryTemp.ID + ThirdCategoryTemp.nextID;

    await ThirdCategory.updateOne(
      { ID: req.body.third_category },
      { $inc: { nextID: 1 } },
    );
  }
  else {
    var newGeneralProductID = req.body.third_category;
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
  res.send(newGeneralProductID);
});

async function setFirstCategory(searchFirstCategory) {
  try {
    const FirstCategoryTemp = await FirstCategory.findOne({
      ID: searchFirstCategory,
    });
    if (FirstCategoryTemp.FirstCategory != 0) {
      return FirstCategoryTemp.FirstCategory;
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

async function setSecondCategory(searchSecondCategory) {
  try {
    const SecondCategoryTemp = await SecondCategory.findOne({
      ID: searchSecondCategory,
    });
    if (SecondCategoryTemp.SecondCategory != 0) {
      return SecondCategoryTemp.SecondCategory;
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

async function setThirdCategory(searchThirdCategory) {
  try {
    const ThirdCategoryTemp = await ThirdCategory.findOne({
      ID: searchThirdCategory,
    });
    if (ThirdCategoryTemp.ThirdCategory != 0) {
      return ThirdCategoryTemp.ThirdCategory;
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

router.put("/", isVerified, async (req, res) => {
  try {
    let generalProductID = req.body.id;

    // name
    if (req.body.name) {
      await GeneralProduct.updateOne(
        { id: generalProductID },
        { $set: { name: req.body.name } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // cost
    if (req.body.cost) {
      await GeneralProduct.updateOne(
        { id: generalProductID },
        { $set: { cost: req.body.cost } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // price
    if (req.body.price) {
      await GeneralProduct.updateOne(
        { id: generalProductID },
        { $set: { price: req.body.price } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // trader
    if (req.body.trader) {
      await GeneralProduct.updateOne(
        { id: generalProductID },
        { $set: { trader: req.body.trader } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // quantity
    if (req.body.quantity) {
      await GeneralProduct.updateOne(
        { id: generalProductID },
        { $set: { quantity: req.body.quantity } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // max_discount
    if (req.body.max_discount) {
      await GeneralProduct.updateOne(
        { id: generalProductID },
        { $set: { max_discount: req.body.max_discount } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // place
    if (req.body.place) {
      await GeneralProduct.updateOne(
        { id: generalProductID },
        { $set: { place: req.body.place } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // date
    if (req.body.date) {
      await GeneralProduct.updateOne(
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

router.delete("/", isVerified, (req, res) => {
  GeneralProduct.deleteOne({ id: req.query.id }, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
});


module.exports = router;

var express = require("express");
var router = express.Router();
const GeneralProduct = require("../models/products/GeneralProduct");
const FirstCategory = require("../models/products/FirstCategory");
const SecondCategory = require("../models/products/SecondCategory");
const ThirdCategory = require("../models/products/ThirdCategory");
const NameCategory = require("../models/products/NameCategory");

router.use(express.json());

// NameCategory.insertMany([
//   { NameCategory: "빨간세탁기", ID: "01" },
//   { NameCategory: "검은세탁기", ID: "02" },
//   { NameCategory: "파랑공기청정기", ID: "03" },
//   { NameCategory: "노랑선풍기", ID: "04" },
// ]);

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
      const NameCategoryTemp = await NameCategory.find({
        name: req.body.name,
      });
      if (NameCategoryTemp.length != 0) {
        // 해당 ID로 ㄱㄱ
      }
      else {

      }
    }
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

router.put("/", async (req, res) => {
  try {
    let customerPhone = req.body.phone;

    // first_category
    if (req.body.name) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { name: req.body.name } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // second_category
    if (req.body.taste) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { taste: req.body.taste } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // third_category
    if (req.body.boolSMS) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { boolSMS: req.body.boolSMS } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // name
    if (req.body.boolLecture) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { boolLecture: req.body.boolLecture } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // cost
    if (req.body.likeCategory) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { likeCategory: req.body.likeCategory } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // price
    if (req.body.something) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { something: req.body.something } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // quantity
    if (req.body.email) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { email: req.body.email } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // place
    if (req.body.birthday) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { birthday: req.body.birthday } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // date
    if (req.body.gender) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { gender: req.body.gender } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // address
    if (req.body.address) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { address: req.body.address } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // mainNumber
    if (req.body.mainNumber) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { mainNumber: req.body.mainNumber } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // point
    if (req.body.point) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { point: req.body.point } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    const customerTemp = await Customer.find({
      phone: req.body.phone,
    });
    res.send(customerTemp);

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

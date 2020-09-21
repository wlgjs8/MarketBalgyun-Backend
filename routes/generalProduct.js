var express = require("express");
var router = express.Router();
const GeneralProduct = require("../models/categories/GeneralProduct");

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

router.post("/", (req, res) => {
  // setGeneralProduct(req);
  console.log("HELLO POST");
  res.send("HELLO POST");
});

function setGeneralProduct(req) {
  const {
    id,
    first_category,
    second_category,
    third_category,
    name,
    cost,
    price,
    quantity,
    place,
    date,
  } = req.body;
  // const generalProduct = await GeneralProducts.insert
}

module.exports = router;

var express = require("express");
var router = express.Router();
const SaleLog = require("../models/saleLog");
// const { duration } = require("moment");
// const { post } = require("./generalCategory");
const fs = require("fs");
const moment = require("moment");
// const json2csv = require("json2csv").parse;
//var xl = require("excel4node");
const path = require("path");
const fields = ["time", "first_category", "second_category", "third_category", "productName", "quantity", "single_price", "single_dicount",
    "single_apply_price", "card", "cash", "point", "total", "customer", "phone", "staff", "consigner", "bank", "account", "account_owner", "trader"];


//csv 출력 라우터
router.get("/", async (req, res) => {
    if(req.query.saleLog){

    }
});

module.exports = router;

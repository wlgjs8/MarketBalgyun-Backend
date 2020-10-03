var express = require("express");
var router = express.Router();
const SaleLog = require("../models/saleLog");

const json2csv = require("json2csv").parse;

const moment = require("moment");
const fs = require("fs");
const excel = require("exceljs");
const path = require("path");


// { header: 'card', key: 'card', width: 10, outlineLevel: 1 }

//csv 출력 라우터
router.get("/", async (req, res) => {
    if (req.query.saleLog) {
        var result = await SaleLog.find();

        var field = [
            { header: 'time1', key: 'time', width: 10 },
            { header: 'first_category', key: 'first_category', width: 10 },
            { header: 'second_category', key: 'second_category', width: 10 },
            { header: 'third_category', key: 'third_category', width: 10 },
            { header: 'productName', key: 'productName', width: 10 },
            { header: 'quantity', key: 'quantity', width: 10 },
            { header: 'single_price', key: 'single_price', width: 10 },
            { header: 'single_dicount', key: 'single_dicount', width: 10 },
            { header: 'card', key: 'card', width: 10 },
            { header: 'cash', key: 'cash', width: 10 },
            { header: 'point', key: 'point', width: 10 },
            { header: 'total', key: 'total', width: 10 },
            { header: 'customer', key: 'customer', width: 10 },
            { header: 'phone', key: 'phone', width: 10 },
            { header: 'staff', key: 'staff', width: 10 },
            { header: 'consigner', key: 'consigner', width: 10 },
            { header: 'bank', key: 'bank', width: 10 },
            { header: 'account', key: 'account', width: 10 },
            { header: 'account_owner', key: 'account_owner', width: 10 },
            { header: 'trader', key: 'trader', width: 10 },
        ];

        var csv = json2csv(result, { field });

        const dateTime = moment().format("YYYYMMDDhhmm");
        const filePath = path.join(__dirname, "..", "public", "csv-" + dateTime + ".csv");
        fs.writeFile(filePath, '\uFEFF' + csv, { encoding: 'utf8' }, function (err) {
            if (err) {
                return res.status(500).json({ err });
            }
            else {
                setTimeout(function () {
                    fs.unlinkSync(filePath);
                }, 30000)
                res.setHeader(
                    "Content-Disposition",
                    "attachment; filename=" + "SaleLog.csv"
                );
                res.sendFile(filePath);
            }
        })
    }
});

module.exports = router;

var express = require("express");
var router = express.Router();
const SaleLog = require("../models/saleLog");
// const { duration } = require("moment");
// const { post } = require("./generalCategory");
const fs = require("fs");
const moment = require("moment");
const json2csv = require("json2csv").parse;
const path = require("path");
const fields = ["time", "first_category", "second_category", "third_category", "productName", "quantity", "single_price", "single_dicount",
    "single_apply_price", "card", "cash", "point", "total", "customer", "phone", "staff", "consigner", "bank", "account", "account_owner", "trader"];


//csv 출력 라우터
router.get("/", async (req, res) => {
    // 판매로그 csv
    // start = req.query.start;
    // end = req.query.end;
    // duration_log = await SaleLog.find({ time: { "$gte": start, "$lte": end } }), select('-_id');
    if (req.query.saleLog) {
        // duration_log = await SaleLog.find().sort({ "_id": -1 });

        // res.writeHead(200, {
        //     'Content-Type': 'text/csv',
        //     'Content-Disposition': 'attachment; filename=SaleLog.csv',
        // });
        // duration_log.csv(res);
        SaleLog.find({}, function (err, salelogs) {
            if (err) {
                return res.status(500).json({ err });
            }
            else {
                let csv
                try {
                    csv = json2csv(salelogs, { fields });
                } catch (err) {
                    return res.status(500).json({ err });
                }
                const dateTime = moment().format("YYYYMMDDhhmm");
                const filePath = path.join(__dirname, "..", "public", "csv-" + dateTime + ".csv")
                fs.writeFile(filePath, '\uFEFF' + csv, function (err) {
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
        })
    }

});

module.exports = router;
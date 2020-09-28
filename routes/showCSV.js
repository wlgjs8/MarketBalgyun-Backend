var express = require("express");
const { duration } = require("moment");
const ConsignProduct = require("../models/products/ConsignProduct");
const GeneralProduct = require("../models/products/GeneralProduct");
var router = express.Router();
const saleLog = require("../models/saleLog");
const { post } = require("./generalCategory");

//csv 출력 라우터
router.get("/", async (req, res) => {
    // 판매로그 csv
    if (req.query.saledLog) {
        start = req.query.start;
        end = req.query.end;
        duration_log = await saleLog.find({ time: { "$gte": start, "$lte": end } }), select('-_id');

        res.writeHead(200, {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename=saleLog.csv',
        });
        duration_log.csv(res);
    }
});

module.exports = router;

var express = require("express");
const { duration } = require("moment");
var router = express.Router();
const saleLog = require("../models/saleLog");

//로그 csv 출력 라우터, 데이터가 없어 잘 출력되는 지 확인 못했슴다.
router.get("/", async (req, res) => {
    start = req.query.start;
    end = req.query.end;
    duration_log = await saleLog.find({time:{"$gte":start, "$lte":end}}),select('-_id');

    res.writeHead(200, {
        'Content-Type':'text/csv',
        'Content-Disposition':'attachment; filename=saleLog.csv',
    });

    duration_log.csv(res);
});

router.post("/", async (req, res) => {
    var saledProduct = req.body.ID;
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
})

module.exports = router;

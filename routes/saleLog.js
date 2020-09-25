var express = require("express");
const { duration } = require("moment");
const ConsignProduct = require("../models/products/ConsignProduct");
const GeneralProduct = require("../models/products/GeneralProduct");
var router = express.Router();
const saleLog = require("../models/saleLog");
const { post } = require("./generalCategory");

//로그 csv 출력 라우터, 데이터가 없어 잘 출력되는 지 확인 못했슴다.
router.get("/", async (req, res) => {
    start = req.query.start;
    end = req.query.end;
    duration_log = await saleLog.find({ time: { "$gte": start, "$lte": end } }), select('-_id');

    res.writeHead(200, {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=saleLog.csv',
    });

    duration_log.csv(res);
});

// 상품 판매 정보 POST, 상품 ID 와 판매 수량
router.post("/", async (req, res) => {
    var saledProduct = req.body.id;
    try {
        const generalProductTemp = await GeneralProduct.find({
            id: req.body.id,
        });
        if (generalProductTemp.length != 0) {
            await GeneralProduct.updateOne(
                { id: req.body.id },
                { $inc: { quantity: -1 } },
            )
        } else {
            const consignProductTemp = await ConsignProduct.find({
                id: req.body.id,
            });
            if (consignProductTemp.length != 0) {
                await ConsignProduct.updateOne(
                    { id: req.body.id },
                    { $inc: { quantity: -1 } },
                )
            }
            else {
                res.send("해당 ID의 상품이 없습니다.");
            }
        }
        // 포인트 적립 혹은 계좌 정보
        res.send("해당 ID의 상품이 판매되었습니다.");
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

function setPoint(price) {
    var pointPlus = price * 0.65;

}

module.exports = router;

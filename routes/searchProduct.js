var express = require("express");
var mergeJSON = require("merge-json");
var router = express.Router();
const GeneralProduct = require("../models/products/GeneralProduct");
const ConsignProduct = require("../models/products/ConsignProduct");
const { isVerified } = require('./middlewares');

router.use(express.json());

// 일반 상품 ID를 통해 검색
router.get("/", async (req, res) => {
    if (req.query.id) {
        var UppercaseID = req.query.id;
        UppercaseID = UppercaseID.toUpperCase();

        const generalProductTemp = await GeneralProduct.find({
            id: UppercaseID,
        });
        if (generalProductTemp.length != 0) {
            res.send(generalProductTemp);
        } else {
            const consignProductTemp = await ConsignProduct.find({
                id: UppercaseID,
            });
            if (consignProductTemp.length != 0) {
                res.send(consignProductTemp);
            }
            else {
                res.send("해당 ID의 상품이 없습니다.");
            }
        }
    }
    else if (req.query.name) {
        const generalProductTemp = await GeneralProduct.find({
            name: { $regex: req.query.name },
        });
        const consignProductTemp = await ConsignProduct.find({
            name: { $regex: req.query.name },
        });
        if ((generalProductTemp != 0) || (consignProductTemp != 0)) {
            var resultProductJson = mergeJSON.merge(generalProductTemp, consignProductTemp);
            res.send(resultProductJson);
        }
        else {
            res.send("해당 이름의 상품이 없습니다.");
        }
    }
    else if (req.query.place) {
        const generalProductTemp = await GeneralProduct.find({
            place: { $regex: req.query.place },
        });
        const consignProductTemp = await ConsignProduct.find({
            place: { $regex: req.query.place },
        });
        if ((generalProductTemp != 0) || (consignProductTemp != 0)) {
            var resultProductJson = mergeJSON.merge(generalProductTemp, consignProductTemp);
            res.send(resultProductJson);
        }
        else {
            res.send("해당 위치의 상품이 없습니다.");
        }
    }
    else if (req.query.trader) {
        const generalProductTemp = await GeneralProduct.find({
            trader: { $regex: req.query.trader },
        });
        if (generalProductTemp != 0) {
            var resultProductJson = mergeJSON.merge(generalProductTemp, []);
            res.send(resultProductJson);
        }
        else {
            res.send("해당 매입처의 상품이 없습니다.");
        }
    }
});

module.exports = router;
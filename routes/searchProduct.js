var express = require("express");
var router = express.Router();
const GeneralProduct = require("../models/products/GeneralProduct");
const ConsignProduct = require("../models/products/ConsignProduct");

router.use(express.json());

// 일반 상품 ID를 통해 검색
router.get("/", async (req, res) => {
    if (req.query.id) {
        const generalProductTemp = await GeneralProduct.find({
            id: req.query.id,
        });
        if (generalProductTemp.length != 0) {
            res.send(generalProductTemp);
        } else {
            const consignProductTemp = await ConsignProduct.find({
                id: req.query.id,
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
        if (generalProductTemp.length != 0) {
            res.send(generalProductTemp);
        } else {
            const consignProductTemp = await ConsignProduct.find({
                name: { $regex: req.query.name },
            });
            if (consignProductTemp.length != 0) {
                res.send(consignProductTemp);
            }
            else {
                res.send("해당 ID의 상품이 없습니다.");
            }
        }
    }
    else {
        res.send("No product id and name");
    }
});


module.exports = router;
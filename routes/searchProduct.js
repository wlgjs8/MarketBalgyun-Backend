var express = require("express");
var router = express.Router();
const GeneralProduct = require("../models/products/GeneralProduct");
const ConsignProduct = require("../models/products/ConsignProduct");
const NameCategory = require("../models/products/NameCategory");

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

// 상품 판매 정보 POST, 상품 ID 와 판매 수량
router.post("/", async (req, res) => {
    const searchNameCategoryTemp = await NameCategory.find({
        sixID: req.body.id,
    });
    if (searchNameCategoryTemp != 0) {
        res.send(searchNameCategoryTemp);
    }
    else {
        res.send("해당 카테고리의 상품명이 존재하지 않습니다.");
    }


});

function setPoint(price) {
    var pointPlus = price * 0.65;

}

module.exports = router;
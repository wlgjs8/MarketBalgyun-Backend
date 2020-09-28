var express = require("express");
var mergeJSON = require("merge-json");
var router = express.Router();
const GeneralProduct = require("../models/products/GeneralProduct");
const ConsignProduct = require("../models/products/ConsignProduct");
const Customer = require("../models/Customer");

router.use(express.json());

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
                { $inc: { quantity: -req.body.quantity } },
            )
        } else {
            const consignProductTemp = await ConsignProduct.find({
                id: req.body.id,
            });
            if (consignProductTemp.length != 0) {
                await ConsignProduct.updateOne(
                    { id: req.body.id },
                    { $inc: { quantity: -req.body.quantity } },
                );
                // 위탁자 포인트 적립
                if (!req.body.accountable) {
                    var pointPlus = req.body.price * 0.65;
                    Customer.updateOne(
                        { name: req.body.consigner },
                        { $inc: { point: pointPlus } },
                        function (err, res) {
                            if (err) throw err;
                        }
                    )
                }
                // 계좌정보 보내기
                else {
                    const ConsingerTemp = Customer.find(
                        { phone: req.body.phone }
                    );
                    var consignerJson = JSON.stringify(ConsingerTemp);
                    res.send(consignerJson);
                }
            }
            else {
                res.send("해당 ID의 상품이 없습니다.");
            }
        }
        // 구매자가 포인트로 일부 결제시, 포인트 차감
        if (req.body.point) {
            Customer.updateOne(
                { name: req.body.customer },
                { $inc: { point: -req.body.point } },
                function (err, res) {
                    if (err) throw err;
                }
            )
        }

        // 구매자 포인트 적립
        var pointPlus = req.body.sum_price;
        pointPlus *= 0.65;
        Customer.updateOne(
            { name: req.body.customer },
            { $inc: { point: pointPlus } },
            function (err, res) {
                if (err) throw err;
            }
        )
        res.send("해당 ID의 상품이 판매되었습니다.");
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

module.exports = router;
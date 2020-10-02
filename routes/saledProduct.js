var express = require("express");
var mergeJSON = require("merge-json");
var router = express.Router();
const GeneralProduct = require("../models/products/GeneralProduct");
const ConsignProduct = require("../models/products/ConsignProduct");
const Customer = require("../models/Customer");
const SaleLog = require("../models/saleLog");

router.use(express.json());

// 상품 판매 정보 POST, 상품 ID 와 판매 수량
router.post("/", async (req, res) => {
    var i = 0;
    var accountJson;

    var items = req.body.items;
    var customer_name = req.body.customer_name;
    var customer_phone = req.body.customer_phone;
    var point = req.body.point;
    var card = req.body.card;
    var cash = req.body.cash;
    var sum_price = req.body.sum_price;

    while (i < items.length) {
        var id = items[i].id;
        var quantity = items[i].quantity;
        var discount = items[i].discount;
        var price = items[i].price;
        var apply_price = items[i++].apply_price;

        const generalProductTemp = await GeneralProduct.find({
            id: id,
        });
        const consignProductTemp = await ConsignProduct.find({
            id: id,
        });

        var SaleLogSchemaTemp = {
            first_category: "",
            second_category: "",
            third_category: "",
            productName: "",
            quantity: quantity,
            single_price: price,
            single_discount: discount,
            single_apply_price: apply_price,
            card: card,
            cash: cash,
            point: point,
            total: (apply_price * quantity),
            customer: customer_name,
            phone: customer_phone.substring(0, 3) + "-" + customer_phone.substring(3, 7) + "-" + customer_phone.substring(7, customer_phone.length),
            staff: "",
            consigner: "",
            bank: "",
            account: "",
            account_owner: "",
            trader: "",
        }

        // 일반 상품의 경우
        if (generalProductTemp.length != 0) {
            // first_category = generalProductTemp[0].first_category;
            await GeneralProduct.updateOne(
                { id: id },
                { $inc: { quantity: -quantity } },
            )
            SaleLogSchemaTemp.first_category = generalProductTemp[0].first_category;
            SaleLogSchemaTemp.second_category = generalProductTemp[0].second_category;
            SaleLogSchemaTemp.third_category = generalProductTemp[0].third_category;
            SaleLogSchemaTemp.trader = generalProductTemp[0].trader;
        }
        // 위탁 상품의 경우
        else {
            if (consignProductTemp.length != 0) {
                // first_category = "위탁 상품";
                await ConsignProduct.updateOne(
                    { id: id },
                    { $inc: { quantity: -quantity } },
                );
                // 위탁자 포인트 적립
                if (!consignProductTemp[0].accountable) {
                    var pointPlus = apply_price * 0.65;
                    Customer.updateOne(
                        { phone: consignProductTemp[0].phone },
                        { $inc: { point: pointPlus } },
                        function (err, res) {
                            if (err) throw err;
                        }
                    )
                }
                // 계좌정보 보내기
                else {
                    accountJson = mergeJSON.merge(accountJson, consignProductTemp);
                }
                var consignerPhone = consignProductTemp[0].phone;
                const ConsignerTemp = await Customer.find(
                    { phone: consignerPhone }
                );
                if (ConsignerTemp.length != 0) {
                    SaleLogSchemaTemp.first_category = "위탁 상품";
                    SaleLogSchemaTemp.consigner = ConsignerTemp[0].name;
                    SaleLogSchemaTemp.bank = ConsignerTemp[0].bank;
                    SaleLogSchemaTemp.account = ConsignerTemp[0].account;
                    SaleLogSchemaTemp.account_owner = ConsignerTemp[0].account_owner;
                }
            }
            else {
                res.send(id + "의 상품이 없습니다.");
            }
        }

        SaleLog.insertMany([SaleLogSchemaTemp]);
    }

    // 구매자 포인트 적립
    var pointCount = sum_price * 0.65;

    // 구매자가 포인트로 일부 결제시, 포인트 차감
    pointCount -= point;
    Math.round(pointCount);

    Customer.updateOne(
        { phone: customer_phone },
        { $inc: { point: pointCount } },
        function (err, res) {
            if (err) throw err;
        }
    );

    res.send(accountJson);
});

module.exports = router;
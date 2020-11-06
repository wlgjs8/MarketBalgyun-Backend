var express = require("express");
var router = express.Router();
const GeneralProduct = require("../models/products/GeneralProduct");
const ConsignProduct = require("../models/products/ConsignProduct");
const Customer = require("../models/Customer");
const SaleLog = require("../models/saleLog");
const { isVerified } = require('./middlewares');

router.use(express.json());

// 상품 판매 정보 POST, 상품 ID 와 판매 수량
router.post("/", isVerified, async (req, res) => {
    var i = 0;

    var items = req.body.items;
    var point = req.body.point;
    var card = req.body.card;
    var cash = req.body.cash;
    var sum_price = req.body.sum_price;
    var staff = req.body.staff;

    var customer_name = "비회원";
    var customer_phone = "";

    // 회원 비회원 구분
    if (req.body.customer_name && req.body.customer_phone) {
        customer_name = req.body.customer_name;
        customer_phone = req.body.customer_phone;

        // 구매자 포인트 적립
        var pointCount = (sum_price - point) * 0.01;

        // 구매자가 포인트로 일부 결제시, 포인트 차감
        pointCount -= point;
        pointCount = Math.round(pointCount / 10);
        pointCount *= 10;

        Customer.updateOne(
            { phone: customer_phone },
            { $inc: { point: pointCount } },
            function (err, res) {
                if (err) throw err;
            }
        );

        console.log("구매자 포인트 : " + pointCount);
    };

    while (i < items.length) {
        var id = items[i].id;
        var quantity = items[i].sale_quantity;
        var discount = items[i].discount;
        var price = items[i].price;
        var apply_price = items[i].apply_price;

        var generalProductTemp = await GeneralProduct.find({ id: id });
        var consignProductTemp = await ConsignProduct.find({ id: id });

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
            total: sum_price,
            customer_name: customer_name,
            customer_phone: customer_phone,
            staff: staff,
            consigner_name: "",
            consigner_phone: "",
            bank: "",
            account: "",
            account_owner: "",
            trader: "",
        }

        console.log("SaleLogSchemaTemp.customer_phone : " + SaleLogSchemaTemp.customer_phone);

        // 일반 상품의 경우
        if (generalProductTemp.length != 0) {
            if ((generalProductTemp[0].quantity - quantity) < 0) {
                res.send(id + "의 상품 수량 부족");
                return;
            }
            await GeneralProduct.updateOne(
                { id: id },
                { $inc: { quantity: -quantity } },
            )
            SaleLogSchemaTemp.productName = generalProductTemp[0].name;
            SaleLogSchemaTemp.first_category = generalProductTemp[0].first_category;
            SaleLogSchemaTemp.second_category = generalProductTemp[0].second_category;
            SaleLogSchemaTemp.third_category = generalProductTemp[0].third_category;
            SaleLogSchemaTemp.trader = generalProductTemp[0].trader;
        }
        // 위탁 상품의 경우
        else {
            if (consignProductTemp.length != 0) {
                if ((consignProductTemp[0].quantity - quantity) < 0) {
                    res.send(id + "의 상품 수량 부족");
                    return;
                }
                await ConsignProduct.updateOne(
                    { id: id },
                    { $inc: { quantity: -quantity } },
                );
                // 위탁자 찾기 
                var consignerPhone = consignProductTemp[0].phone;
                const ConsignerTemp = await Customer.find(
                    { phone: consignerPhone }
                );
                if (ConsignerTemp.length != 0) {
                    SaleLogSchemaTemp.first_category = consignProductTemp[0].first_category;
                    SaleLogSchemaTemp.second_category = consignProductTemp[0].second_category;
                    SaleLogSchemaTemp.third_category = consignProductTemp[0].third_category;
                    SaleLogSchemaTemp.productName = consignProductTemp[0].name;
                    SaleLogSchemaTemp.consigner_name = ConsignerTemp[0].name;
                    SaleLogSchemaTemp.consigner_phone = ConsignerTemp[0].phone;
                    SaleLogSchemaTemp.bank = ConsignerTemp[0].bank;
                    SaleLogSchemaTemp.account = ConsignerTemp[0].account;
                    SaleLogSchemaTemp.account_owner = ConsignerTemp[0].account_owner;

                    console.log("ConsignerTemp[0].phone : " + ConsignerTemp[0].phone);
                }
                // 위탁자 포인트 적립
                if (!consignProductTemp[0].accountable) {
                    var pointPlus = apply_price * 0.65;
                    pointPlus = Math.round(pointPlus / 10);
                    pointPlus *= 10;

                    console.log("위탁자 포인트 : " + pointPlus);
                    Customer.updateOne(
                        { phone: consignProductTemp[0].phone },
                        { $inc: { point: pointPlus } },
                        function (err, res) {
                            if (err) throw err;
                        }
                    );
                }
            }
            else {
                res.send(id + "의 상품이 없습니다.");
                return;
            }
        }
        SaleLog.insertMany([SaleLogSchemaTemp]);
        i++;
    }

    res.send("상품 판매 완료");
});

module.exports = router;
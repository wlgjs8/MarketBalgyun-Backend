var express = require("express");
var router = express.Router();
const SaleLog = require("../models/saleLog");
const Customer = require("../models/Customer");
const Trader = require("../models/Trader");
const GeneralProduct = require('../models/products/GeneralProduct.js');
const ConsignProduct = require('../models/products/ConsignProduct');
const fs = require("fs");
const moment = require("moment");
const json2csv = require("json2csv").parse;
const path = require("path");
const { isVerified } = require('./middlewares');

router.get("/", isVerified, async (req, res) => {
    if (req.query.saleLog) {
        if (req.query.start && req.query.end) {
            const fields = [
                {
                    label: "일시",
                    value: "time",
                }, {
                    label: "대분류",
                    value: "first_category",
                }, {
                    label: "중분류",
                    value: "second_category",
                }, {
                    label: "소분류",
                    value: "third_category",
                }, {
                    label: "상품명",
                    value: "productName",
                }, {
                    label: "수량",
                    value: "quantity",
                }, {
                    label: "개별가격",
                    value: "single_price",
                }, {
                    label: "개별 할인가",
                    value: "single_dicount",
                }, {
                    label: "개별 할인적용가",
                    value: "single_apply_price",
                }, {
                    label: "카드결제가",
                    value: "card",
                }, {
                    label: "현금결제가",
                    value: "cash",
                }, {
                    label: "포인트결제가",
                    value: "point",
                }, {
                    label: "총액",
                    value: "total",
                }, {
                    label: "고객명",
                    value: "customer",
                }, {
                    label: "전화번호",
                    value: "phone",
                }, {
                    label: "판매직원",
                    value: "staff",
                }, {
                    label: "위탁자",
                    value: "consigner",
                }, {
                    label: "은행",
                    value: "bank",
                }, {
                    label: "계좌",
                    value: "account",
                }, {
                    label: "예금주",
                    value: "account_owner",
                }, {
                    label: "매입처",
                    value: "trader"
                },
            ];
            const start = moment(new Date(req.query.start));
            const end = moment(new Date(req.query.end)).add(1, 'days');
            // console.log(start);
            // console.log(end);
            SaleLog.find({ time: { $gte: start, $lte: end } }, function (err, salelogs) {
                if (err) {
                    return res.status(500).json({ err });
                }
                for (var i = 0; i < salelogs.length; i++) {
                    salelogs[i].phone = "=\"" + salelogs[i].phone + "\"";
                    salelogs[i].account = "=\"" + salelogs[i].account + "\"";
                }
                let csv
                try {
                    csv = json2csv(salelogs, { fields });
                    console.log(csv);
                } catch (err) {
                    return res.status(500).json({ err });
                }
                const filePath = path.join(__dirname, "..", "public", "saleLog" + ".csv");
                fs.writeFile(filePath, '\uFEFF' + csv, function (err) {
                    if (err) {
                        return res.status(500).json({ err });
                    }
                    else {
                        res.setHeader(
                            "Content-Disposition",
                            "attachment; filename=" + "SaleLog.csv"
                        );
                        res.sendFile(filePath);
                    }
                });
            }
            );
        }
    }
    else if (req.query.generalProduct) {
        const fields = [
            {
                label: "id",
                value: "id",
            }, {
                label: "대분류",
                value: "first_category",
            }, {
                label: '중분류',
                value: 'second_category',
            }, {
                label: '소분류',
                value: 'third_category',
            }, {
                label: '상품명',
                value: 'name',
            }, {
                label: '원가',
                value: 'cost',
            }, {
                label: '판매가',
                value: 'price',
            }, {
                label: '매입처',
                value: 'trader',
            }, {
                label: '재고',
                value: 'quantity',
            }, {
                label: '위치',
                value: 'place',
            }, {
                label: '일시',
                value: 'date',
            },
        ];

        GeneralProduct.find({}, (err, generalProduct) => {
            if (err) {
                return res.status(500).json({ err });
            }
            let csv
            try {
                csv = json2csv(generalProduct, { fields });
                console.log(csv);
            } catch (err) {
                return res.status(500).json({ err });
            }
            const filePath = path.join(__dirname, "..", "public", "generalProduct" + ".csv");
            fs.writeFile(filePath, '\uFEFF' + csv, function (err) {
                if (err) {
                    return res.status(500).json({ err });
                }
                else {
                    res.setHeader(
                        "Content-Disposition",
                        "attachment; filename=" + "generalProduct.csv"
                    );
                    res.sendFile(filePath);
                }
            });
        });
    }
    else if (req.query.consignProduct) {
        const fields = [
            {
                label: 'id',
                value: 'id',
            }, {
                label: '대분류',
                value: 'first_category',
            }, {
                label: '중분류',
                value: 'second_category',
            }, {
                label: '소분류',
                value: 'third_category',
            }, {
                label: '상품명',
                value: 'name',
            }, {
                label: '판매가',
                value: 'price',
            }, {
                label: '희망가',
                value: 'wanted_price',
            }, {
                label: '재고',
                value: 'quantity',
            }, {
                label: '사연',
                value: 'story',
            }, {
                label: '최대할인률',
                value: 'max_discout',
            }, {
                label: '위치',
                value: 'place',
            }, {
                label: '만료',
                value: 'expire_date',
            },
        ];

        ConsignProduct.find((err, consignProduct) => {
            if (err) {
                return res.status(500).json({ err });
            }
            let csv
            try {
                csv = json2csv(consignProduct, { fields });
                console.log(csv);
            } catch (err) {
                return res.status(500).json({ err });
            }
            const filePath = path.join(__dirname, "..", "public", "consignProduct" + ".csv");
            fs.writeFile(filePath, '\uFEFF' + csv, function (err) {
                if (err) {
                    return res.status(500).json({ err });
                }
                else {
                    res.setHeader(
                        "Content-Disposition",
                        "attachment; filename=" + "consignProduct.csv"
                    );
                    res.sendFile(filePath);
                }
            });
        });
    }
    else if (req.query.customer) {

        const fields = [
            {
                label: "이름",
                value: "name",
            }, {
                label: "번호",
                value: "phone",
            }, {
                label: "취향",
                value: "taste"
            }, {
                label: "SMS 수신여부",
                value: "boolSMS"
            }, {
                label: "강의 수강여부",
                value: "boolLecture"
            }, {
                label: "관심 카테고리",
                value: "likeCategory"
            }, {
                label: "비고",
                value: "something"
            }, {
                label: "이메일",
                value: "email"
            }, {
                label: "생년월일",
                value: "birthday"
            }, {
                label: "성별",
                value: "gender"
            }, {
                label: "주소",
                value: "address"
            }, {
                label: "주거래 매장",
                value: "mainNumber"
            }, {
                label: "포인트",
                value: "point"
            }, {
                label: "등록 날짜",
                value: "time"
            }, {
                label: "은행",
                value: "bank"
            }, {
                label: "계좌번호",
                value: "account"
            }, {
                label: "예금주",
                value: "account_owner"
            },
        ];

        Customer.find(function (err, customers) {
            if (err) {
                return res.status(500).json({ err });
            }
            for (var i = 0; i < customers.length; i++) {
                customers[i].phone = "=\"" + customers[i].phone + "\"";
                customers[i].account = "=\"" + customers[i].account + "\"";
            }
            let csv
            try {
                csv = json2csv(customers, { fields });
            } catch (err) {
                return res.status(500).json({ err });
            }
            const filePath = path.join(__dirname, "..", "public", "customer" + ".csv");
            fs.writeFile(filePath, '\uFEFF' + csv, function (err) {
                if (err) {
                    return res.status(500).json({ err });
                }
                else {
                    res.setHeader(
                        "Content-Disposition",
                        "attachment; filename=" + "Customer.csv"
                    );
                    res.sendFile(filePath);
                }
            });
        });
    }
    else if (req.query.trader) {
        const fields = [
            {
                label: "거래처명",
                value: "name"
            }, {
                label: "사업자 번호",
                value: "trader_number"
            }, {
                label: "CEO",
                value: "CEO"
            }, {
                label: "업태",
                value: "business"
            }, {
                label: "종목",
                value: "business_item"
            }, {
                label: "거래처 번호",
                value: "phone"
            }, {
                label: "휴대전화",
                value: "mobile_phone"
            }, {
                label: "이메일",
                value: "email"
            }, {
                label: "거래처 사이트",
                value: "site"
            }, {
                label: "우편번호",
                value: "post"
            }, {
                label: "주소",
                value: "address"
            }, {
                label: "관리사원",
                value: "staff"
            }, {
                label: "거래은행",
                value: "bank"
            }, {
                label: "계좌번호",
                value: "account"
            }, {
                label: "예금주",
                value: "account_owner"
            }, {
                label: "수수료",
                value: "fee"
            },
        ];
        Trader.find(function (err, traders) {
            if (err) {
                return res.status(500).json({ err });
            }
            for (var i = 0; i < traders.length; i++) {
                traders[i].phone = "=\"" + traders[i].phone + "\"";
                traders[i].mobile_phone = "=\"" + traders[i].mobile_phone + "\"";
                traders[i].account = "=\"" + traders[i].account + "\"";
            }
            let csv
            try {
                csv = json2csv(traders, { fields });
            } catch (err) {
                return res.status(500).json({ err });
            }
            const filePath = path.join(__dirname, "..", "public", "Trader" + ".csv");
            fs.writeFile(filePath, '\uFEFF' + csv, function (err) {
                if (err) {
                    return res.status(500).json({ err });
                }
                else {
                    res.setHeader(
                        "Content-Disposition",
                        "attachment; filename=" + "Trader.csv"
                    );
                    res.sendFile(filePath);
                }
            });
        })
    }
    else {
        res.send("해당 csv 없음.");
    }

});

module.exports = router;
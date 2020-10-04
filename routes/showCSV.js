var express = require("express");
var router = express.Router();
const SaleLog = require("../models/saleLog");
const Customer = require("../models/Customer");
const { duration } = require("moment");
const fs = require("fs");
const moment = require("moment");
const json2csv = require("json2csv").parse;
const path = require("path");
const sale_fields = [
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
        label: "개별 할인률",
        value: "single_dicount",
    }, {
        label: "개별할인적용가",
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

const customer_fields = [
    {
        label: "이름",
        value: "name"
    }, {
        label: "번호",
        value: "phone"
    }, {
        label: "취향",
        value: "taste"
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
        label: "포인트",
        value: "point"
    }, {
        label: "은행",
        value: "bank"
    }, {
        label: "계좌번호",
        value: "account"
    }, {
        label: "예금주",
        value: "account_owner"
    }, {
        label: "주거래 매장",
        value: "mainNumber"
    }, {
        label: "SMS 수신여부",
        value: "boolSMS"
    }, {
        label: "강의 수강여부",
        value: "boolLecture"
    }, {
        label: "등록 날짜",
        value: "time"
    },

];

router.get("/", async (req, res) => {
    // 판매로그 csv
    // start = req.query.start;
    // end = req.query.end;
    // duration_log = await SaleLog.find({ time: { "$gte": start, "$lte": end } }), select('-_id');
    if (req.query.saleLog) {
        if (req.query.start && req.query.end) {
            const start = moment(new Date(req.query.start)).add(9, 'hours');
            const end = moment(new Date(req.query.end)).add(9, 'hours');
            SaleLog.find({ time: { $gte: start, $lte: end } }, function (err, salelogs) {
                if (err) {
                    return res.status(500).json({ err });
                }
                let csv
                try {
                    csv = json2csv(salelogs, { sale_fields });
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
    else if (req.query.product) {
        res.send("상품현황 csv");
    }
    else if (req.query.customer) {
        const customerlogs = await Customer.find();
        let csv3;
        try {
            csv3 = json2csv(customerlogs, { customer_fields });
        } catch (err) {
            return res.status(500).json({ err });
        }
        const filePath3 = path.join(__dirname, "..", "public", "customerLog" + ".csv");
        fs.writeFile(filePath3, '\uFEFF' + csv3, function (err) {
            if (err) {
                return res.status(500).json({ err });
            }
            else {
                res.setHeader(
                    "Content-Disposition",
                    "attachment; filename=" + "CustomerLog.csv"
                );
                res.send(filePath3);
            }
        });
    }
    else if (req.query.trader) {
        res.send("거래처 현황 csv");
    }
    else {
        res.send("해당 csv 없음.");
    }

});

module.exports = router;
var express = require("express");
var router = express.Router();
const SaleLog = require("../models/saleLog");
const { duration } = require("moment");
// const { post } = require("./generalCategory");
const fs = require("fs");
const moment = require("moment");
const json2csv = require("json2csv").parse;
const path = require("path");
const fields = [
    {
        label:"일시",
        value:"time",
    },{
        label:"대분류",
        value:"first_category",
    }, {
        label:"중분류",
        value:"second_category",
    }, {
        label:"소분류",
        value:"third_category",
    }, {
        label:"상품명",
        value:"productName",
    }, {
        label:"수량",
        value:"quantity", 
    }, {
        label:"개별가격",
        value:"single_price",
    }, {
        label:"개별 할인률",
        value:"single_dicount",
    }, {
        label:"개별할인적용가",
        value:"single_apply_price",
    }, {
        label:"카드결제가",
        value:"card",
    }, {
        label:"현금결제가",
        value:"cash", 
    }, {
        label:"포인트결제가",
        value:"point",
    }, {
        label:"총액",
        value:"total",
    }, {
        label:"고객명",
        value:"customer",
    }, {
        label:"전화번호",
        value:"phone",
    }, {
        label:"판매직원",
        value:"staff",
    }, {
        label:"위탁자",
        value:"consigner",
    }, {
        label:"은행",
        value:"bank",
    }, {
        label:"계좌",
        value:"account",
    }, {
        label:"예금주",
        value:"account_owner",
    }, {
        label:"매입처",
        value:"trader"
    },
];


//csv 출력 라우터
// router.get("/", async (req, res) => {
//     // 판매로그 csv
//     // start = req.query.start;
//     // end = req.query.end;
//     // duration_log = await SaleLog.find({ time: { "$gte": start, "$lte": end } }), select('-_id');
//     if (req.query.saleLog) {
//         // duration_log = await SaleLog.find().sort({ "_id": -1 });

//         // res.writeHead(200, {
//         //     'Content-Type': 'text/csv',
//         //     'Content-Disposition': 'attachment; filename=SaleLog.csv',
//         // });
//         // duration_log.csv(res);
//         SaleLog.find({}, function (err, salelogs) {
//             if (err) {
//                 return res.status(500).json({ err });
//             }
//             else {
//                 let csv
//                 try {
//                     csv = json2csv(salelogs, { fields });
//                 } catch (err) {
//                     return res.status(500).json({ err });
//                 }
//                 const dateTime = moment().format("YYYYMMDDhhmm");
//                 const filePath = path.join(__dirname, "..", "public", "csv-" + dateTime + ".csv");
//                 fs.writeFile(filePath, '\uFEFF' + csv, function (err) {
//                     if (err) {
//                         return res.status(500).json({ err });
//                     }
//                     else {
//                         setTimeout(function () {
//                             fs.unlinkSync(filePath);
//                         }, 30000)
//                         res.setHeader(
//                             "Content-Disposition",
//                             "attachment; filename=" + "SaleLog.csv"
//                         );
//                         res.sendFile(filePath);
//                     }
//                 })
//             }
//         })
//     }

// });

router.get("/", async (req, res) => {
    // 판매로그 csv
    // start = req.query.start;
    // end = req.query.end;
    // duration_log = await SaleLog.find({ time: { "$gte": start, "$lte": end } }), select('-_id');
    if (req.query.start && req.query.end) {
        // duration_log = await SaleLog.find().sort({ "_id": -1 });

        // res.writeHead(200, {
        //     'Content-Type': 'text/csv',
        //     'Content-Disposition': 'attachment; filename=SaleLog.csv',
        // });
        // duration_log.csv(res);
        const start = moment(new Date(req.query.start));
        const end = moment(new Date(req.query.end)).add(1, 'days');
        console.log(start);
        console.log(end);
        SaleLog.find({ time:{ $gte:start, $lte:end } }, function (err, salelogs) {
            if (err) {
                return res.status(500).json({ err });
            }
                let csv
                try {
                    csv = json2csv(salelogs, { fields });
                    console.log(csv);
                } catch (err) {
                    return res.status(500).json({ err });
                }
                //const dateTime = moment().format("YYYYMMDDhhmm");
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

});

module.exports = router;
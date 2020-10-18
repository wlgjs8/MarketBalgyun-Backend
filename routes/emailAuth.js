var express = require("express");
var router = express.Router();
const Customer = require("../models/Customer");
router.use(express.json());
const { isVerified } = require('./middlewares');

const nodemailer = require("nodemailer");
const crypto = require("crypto");

var token, mailOptions, host;

// 보내는 메일 주소
const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PW
    },
    tls: {
        rejectUnauthorized: false
    }
});

router.get("/verify", (req, res) => {
    if ((req.protocol + "://" + req.get('host')) == ("https://" + host)) {
        if (req.query.id == token) {
            console.log("Email has been Vertified");
            res.send("이메일 인증 완료");
        }
        else {
            console.log("Email is not verified");
            res.end("이메일 인증 실패");
        }
    }
});

router.post("/", async (req, res) => {
    try {
        const customerTemp = await Customer.find({ email: req.body.email });

        if (customerTemp.length != 0) {
            res.send('이미 등록된 이메일 입니다.');
            return;
        }
        else {
            // token = crypto.tokenomBytes(20).toString("hex");
            token = crypto.randomBytes(20).toString("hex");
            host = req.get('host');

            mailOptions = {
                from: process.env.NODEMAILER_USER,
                to: req.body.email,
                subject: "회원가입 인증 이메일입니다.",
                text: "회원가입을 완료하시려면 아래의 URL을 클릭하여 주세요.\n" +
                    (req.protocol + "://" + req.get('host')) + "/emailAuth/verify?id=" + token,
            };
            smtpTransport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log(error);
                    res.end("SendMail Error");
                } else {
                    res.end("SendMail Success");
                }
            });
        }

    } catch (error) {
        console.log(error);
        return next(error);
    }
});

module.exports = router;

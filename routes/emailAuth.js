var express = require("express");
var router = express.Router();
const Customer = require("../models/Customer");
const Token = require("../models/Token");
router.use(express.json());
const { isVerified } = require('./middlewares');

const nodemailer = require("nodemailer");
const crypto = require("crypto");

// 보내는 메일 주소
const smtpTransport = nodemailer.createTransport({
    service: "Naver",
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PW
    },
    tls: {
        rejectUnauthorized: false
    }
});

router.get("/verify", async (req, res) => {
    const tokenTemp = await Token.find({ token: req.query.id });

    if (tokenTemp.length < 1) {
        return res.send("다시 이메일 인증해주세요");
    }
    const emailTemp = tokenTemp[0].email;

    if ((req.protocol + "://" + req.get('host')) == ("http://" + tokenTemp[0].host)) {
        if (tokenTemp[0].length != 0) {
            await Token.updateOne(
                { email: emailTemp },
                { $set: { boolEmailAuth: true } },
                function (err, res) {
                    if (err) throw err;
                }
            );
            console.log("Email has been Vertified");
            return res.send("이메일 인증 완료");
        }
        else {
            console.log("Email is not verified");
            return res.end("이메일 인증 실패");
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
            var token = crypto.randomBytes(20).toString("hex");
            var host = req.get('host');

            var tokenTemp = {
                token: token,
                email: req.body.email,
                host: host,
            }
            Token.insertMany([tokenTemp]);

            var mailOptions = {
                from: process.env.NODEMAILER_USER,
                to: req.body.email,
                subject: "회원가입 인증 이메일입니다.",
                text: "회원가입을 완료하시려면 아래의 URL을 클릭하여 주세요.\n" +
                    (req.protocol + "://" + req.get('host')) + "/emailAuth/verify?id=" + token,
            };
            smtpTransport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log(error);
                    return res.send("인증메일 보내기 실패");
                } else {
                    return res.send("인증메일을 확인해주세요.");
                }
            });
        }

    } catch (error) {
        console.log(error);
        return next(error);
    }
});

module.exports = router;

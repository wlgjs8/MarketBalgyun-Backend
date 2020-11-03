var express = require("express");
var router = express.Router();
const Customer = require("../models/Customer");
const Token = require("../models/Token");
router.use(express.json());
const { isVerified } = require('./middlewares');


// 고객 전화번호 뒤 4자리로 검색
router.get("/", isVerified, async (req, res) => {
  try {
    const postPhone = req.query.phone;
    const customerTemp = await Customer.find({
      phone: { $regex: postPhone + "$" },
    });
    if (customerTemp.length == 1) {
      customerJson = JSON.stringify(customerTemp);
      res.send(customerJson);
    }
    else if (customerTemp.length > 1) {
      res.send("해당 번호의 회원이 여러명입니다. 번호 전체를 입력해주세요.");
    }
    else {
      res.send("해당 번호의 회원이 없습니다.");
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// 신규 고객 정보 저장
router.post("/", async (req, res) => {
  try {
    const customerTemp = await Customer.find({ phone: req.body.phone });
    const tokenTemp = await Token.find({ email: req.body.email });

    if (!tokenTemp[0].boolEmailAuth) {
      return res.send("이메일 인증이 필요합니다.");
    }

    if (customerTemp[0].length != 0) {
      return res.send('이미 등록된 번호입니다.');
    }
    else {
      Customer.insertMany([req.body]);
      return res.send("Posting Success");
    }

  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// 전화번호를 통해 정보 수정
router.put("/", isVerified, async (req, res) => {
  try {
    let customerPhone = req.body.phone;

    //name
    if (req.body.name) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { name: req.body.name } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    //taste
    if (req.body.taste) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { taste: req.body.taste } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    //boolSMS
    if (req.body.boolSMS) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { boolSMS: req.body.boolSMS } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // boolLecture
    if (req.body.boolLecture) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { boolLecture: req.body.boolLecture } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // likeCategory
    if (req.body.likeCategory) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { likeCategory: req.body.likeCategory } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // something
    if (req.body.something) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { something: req.body.something } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // email
    if (req.body.email) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { email: req.body.email } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // birthday
    if (req.body.birthday) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { birthday: req.body.birthday } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // Gender
    if (req.body.gender) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { gender: req.body.gender } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // address
    if (req.body.address) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { address: req.body.address } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // mainNumber
    if (req.body.mainNumber) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { mainNumber: req.body.mainNumber } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // point
    if (req.body.point) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { point: req.body.point } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // bank
    if (req.body.bank) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { bank: req.body.bank } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // account
    if (req.body.account) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { account: req.body.account } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // account_owner
    if (req.body.account_owner) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { account_owner: req.body.account_owner } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    // boolConsign
    if (req.body.boolConsign) {
      Customer.updateOne(
        { phone: customerPhone },
        { $set: { boolConsign: req.body.boolConsign } },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
    const customerTemp = await Customer.find({
      phone: req.body.phone,
    });
    res.send(customerTemp);

  } catch (error) {
    console.log(error);
    return error;
  }
});

// 고객 정보 삭제
router.delete("/", isVerified, (req, res) => {
  Customer.deleteOne({ phone: req.query.phone }, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
});

module.exports = router;

var express = require("express");
var router = express.Router();
const ConsignProduct = require("../models/products/ConsignProduct");
const Customer = require("../models/Customer");

router.get("/", async (req, res) => {
    try {
        const searchID = req.query.id;
        const consignProductTemp = await ConsignProduct.find({
            id: searchID,
        });
        if (consignProductTemp.length != 0) {
            consignProductJson = JSON.stringify(consignProductTemp);
            res.send(consignProductJson);
        } else {
            res.send("No Consign Product");
        }
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

router.post("/", async (req, res) => {
    try {
        var firstCategoryName = await setFirstCategory(req.body.first_category);
        var secondCategoryName = await setSecondCategory(req.body.second_category);
        var thirdCategoryName = await setThirdCategory(req.body.third_category);

        const ConsignProductTemp = await ConsignProduct.find().sort({ "_id": -1 }).limit(1);

        var tempIndex = ConsignProductTemp[0].id.substring(1, ConsignProductTemp[0].id.length);
        tempIndex *= 1;
        var newConsignProductIndex = tempIndex + 1;
        var newConsignProductID = "C" + newConsignProductIndex;

        var CustomerTemp = await Customer.find(
            { phone: req.body.phone },
        );

        var ConsignProductSchemaTemp = {
            id: newConsignProductID,
            first_category: firstCategoryName,
            second_category: secondCategoryName,
            third_category: thirdCategoryName,
            name: req.body.name,
            price: req.body.price,
            wanted_price: req.body.wanted_price,
            quantity: req.body.quantity,
            story: req.body.story,
            max_discount: req.body.max_discount,
            place: req.body.place,
            consigner: req.body.consigner,
            phone: req.body.phone,
            accountable: req.body.accountable,
            bank: CustomerTemp[0].bank,
            account: CustomerTemp[0].account,
            account_owner: CustomerTemp[0].account_owner,
        }
        if (!req.body.wanted_price) {
            ConsignProductSchemaTemp.wanted_price = req.body.price;
        }

        ConsignProduct.insertMany([ConsignProductSchemaTemp]);

        res.send(newConsignProductID);
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

async function setFirstCategory(searchFirstCategory) {
    try {
        const FirstCategoryTemp = await FirstCategory.find({
            ID: searchFirstCategory,
        });
        if (FirstCategoryTemp.length != 0) {
            return FirstCategoryTemp[0].FirstCategory;
        }
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

async function setSecondCategory(searchSecondCategory) {
    try {
        const SecondCategoryTemp = await SecondCategory.find({
            ID: searchSecondCategory,
        });
        if (SecondCategoryTemp.length != 0) {
            return SecondCategoryTemp[0].SecondCategory;
        }
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

async function setThirdCategory(searchThirdCategory) {
    try {
        const ThirdCategoryTemp = await ThirdCategory.find({
            ID: searchThirdCategory,
        });
        if (ThirdCategoryTemp.length != 0) {
            return ThirdCategoryTemp[0].ThirdCategory;
        }
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

router.put("/", async (req, res) => {
    try {
        let searchID = req.body.id;

        //name
        if (req.body.name) {
            ConsignProduct.updateOne(
                { id: searchID },
                { $set: { name: req.body.name } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //price
        if (req.body.price) {
            ConsignProduct.updateOne(
                { id: searchID },
                { $set: { price: req.body.price } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //wanted_price
        if (req.body.wanted_price) {
            ConsignProduct.updateOne(
                { id: searchID },
                { $set: { wanted_price: req.body.wanted_price } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //quantity
        if (req.body.quantity) {
            ConsignProduct.updateOne(
                { id: searchID },
                { $set: { quantity: req.body.quantity } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //story
        if (req.body.story) {
            ConsignProduct.updateOne(
                { id: searchID },
                { $set: { story: req.body.story } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //max_discount
        if (req.body.max_discount) {
            ConsignProduct.updateOne(
                { id: searchID },
                { $set: { max_discount: req.body.max_discount } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //place
        if (req.body.place) {
            ConsignProduct.updateOne(
                { id: searchID },
                { $set: { place: req.body.place } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //date
        if (req.body.date) {
            ConsignProduct.updateOne(
                { id: searchID },
                { $set: { date: req.body.date } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //expire_date
        if (req.body.expire_date) {
            ConsignProduct.updateOne(
                { id: searchID },
                { $set: { expire_date: req.body.expire_date } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //consigner
        if (req.body.consigner) {
            ConsignProduct.updateOne(
                { id: searchID },
                { $set: { consigner: req.body.consigner } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //phone
        if (req.body.phone) {
            ConsignProduct.updateOne(
                { id: searchID },
                { $set: { phone: req.body.phone } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //accountable
        if (req.body.accountable) {
            ConsignProduct.updateOne(
                { id: searchID },
                { $set: { accountable: req.body.accountable } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //bank
        if (req.body.bank) {
            ConsignProduct.updateOne(
                { id: searchID },
                { $set: { bank: req.body.bank } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //account
        if (req.body.account) {
            ConsignProduct.updateOne(
                { id: searchID },
                { $set: { account: req.body.account } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //account_owner
        if (req.body.account_owner) {
            ConsignProduct.updateOne(
                { id: searchID },
                { $set: { account_owner: req.body.account_owner } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        const consignProductTemp = await ConsignProduct.find({
            id: req.body.id,
        });
        res.send(consignProductTemp);

    } catch (error) {
        console.log(error);
        return next(error);
    }
});

router.delete("/", (req, res) => {
    ConsignProduct.deleteOne({ id: req.query.id }, (err, result) => {
        if (err) {
            return next(err);
        }
        res.json(result);
    });
});

module.exports = router;

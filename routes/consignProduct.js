var express = require("express");
var router = express.Router();
const ConsignProduct = require("../models/products/ConsignProduct");

router.get("/", async (req, res) => {
    try {
        const searchID = req.query.id;
        const consigneProductTemp = await ConsignProduct.find({
            id: searchID,
        });
        if (consigneProductTemp.length != 0) {
            consigneProductJson = JSON.stringify(consigneProductTemp);
            res.send(consigneProductJson);
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
        ConsignProduct.insertMany([req.body]);
        res.send("Posting Success");
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

router.put("/", (req, res => {
    try {
        let searchID = req.body.id;

        //name
        if (req.body.name) {
            Customer.updateOne(
                { id: searchID },
                { $set: { name: req.body.name } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //price
        if (req.body.name) {
            Customer.updateOne(
                { id: searchID },
                { $set: { name: req.body.name } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //wanted_price
        if (req.body.name) {
            Customer.updateOne(
                { id: searchID },
                { $set: { name: req.body.name } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //cost
        if (req.body.name) {
            Customer.updateOne(
                { id: searchID },
                { $set: { name: req.body.name } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //quantity
        if (req.body.name) {
            Customer.updateOne(
                { id: searchID },
                { $set: { name: req.body.name } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //story
        if (req.body.name) {
            Customer.updateOne(
                { id: searchID },
                { $set: { name: req.body.name } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //max_discount
        if (req.body.name) {
            Customer.updateOne(
                { id: searchID },
                { $set: { name: req.body.name } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //place
        if (req.body.name) {
            Customer.updateOne(
                { id: searchID },
                { $set: { name: req.body.name } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //date
        if (req.body.name) {
            Customer.updateOne(
                { id: searchID },
                { $set: { name: req.body.name } },
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
}))

router.delete("/", (req, res) => {
    ConsignProduct.deleteOne({ id: req.query.id }, (err, result) => {
        if (err) {
            return next(err);
        }
        res.json(result);
    });
});

module.exports = router;

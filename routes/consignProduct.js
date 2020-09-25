var express = require("express");
var router = express.Router();
const ConsignProduct = require("../models/products/ConsignProduct");

// ConsignProduct.insertMany([
//     {
//         id: "C1", name: "1111", price: 3333, wanted_price: 4444, cost: 5555, quantity: 10, story: "", max_discount: 10, place: "",
//     }, // date
//     {
//         id: "C2", name: "1111", price: 3333, wanted_price: 4444, cost: 5555, quantity: 10, story: "", max_discount: 10, place: "",
//     }, // date
// ]);

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

router.put("/", async (req, res) => {
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
        if (req.body.price) {
            Customer.updateOne(
                { id: searchID },
                { $set: { price: req.body.price } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //wanted_price
        if (req.body.wanted_price) {
            Customer.updateOne(
                { id: searchID },
                { $set: { wanted_price: req.body.wanted_price } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //cost
        if (req.body.cost) {
            Customer.updateOne(
                { id: searchID },
                { $set: { cost: req.body.cost } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //quantity
        if (req.body.quantity) {
            Customer.updateOne(
                { id: searchID },
                { $set: { quantity: req.body.quantity } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //story
        if (req.body.story) {
            Customer.updateOne(
                { id: searchID },
                { $set: { story: req.body.story } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //max_discount
        if (req.body.max_discount) {
            Customer.updateOne(
                { id: searchID },
                { $set: { max_discount: req.body.max_discount } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //place
        if (req.body.place) {
            Customer.updateOne(
                { id: searchID },
                { $set: { place: req.body.place } },
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        //date
        if (req.body.date) {
            Customer.updateOne(
                { id: searchID },
                { $set: { date: req.body.date } },
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

const router = require("express").Router();
const product = require("../Models/Products")

router.get("/",async (req,res) => {
    const products = await product.find({});
    res.status(200).send(products);
})

router.get("/:cat",async (req,res) => {
    const category = req.params.cat;
    const results = await product.find({category: category})
    res.status(200).json(results);
})

module.exports = router;
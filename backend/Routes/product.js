const router = require("express").Router();
const product = require("../Models/Products")

router.get("/",async (req,res) => {
    const Product = product.Product
    const products = await Product.find({});
    res.status(200).send(products);
})

router.get("/:cat",async (req,res) => {
    const category = req.params.cat;
    const Product = product.Product
    const results = await Product.find({category: category})
    res.status(200).json(results);
})

module.exports = router;
const router = require("express").Router();
const product = require("../Models/Products")

router.get("/",async (req,res) => {
    const products = await product.find({});
    res.status(200).send(products);
})

module.exports = router;
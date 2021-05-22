const router = require("express").Router();
const Category = require("../Models/Categories")


router.get("/",async (req,res) => {
    const categories = await Category.find({});
    res.status(200).send(categories);
})

module.exports = router;
const router = require("express").Router()
const product = require("../Models/Products")
const categories = require("../Models/Categories")


router.post("/add_prod",async (req,res) => {
    const prod = new product({
        name: req.body.name,
        imageUrl: req.body.image,
        rating: req.body.rating,
        reviews: req.body.review,
        Price: req.body.price,
        category: req.body.category,
    })
    await prod.save()
    .then((data) => res.status(200).send({id: prod._id}))
    .catch((err) => console.log(err))
}) 

module.exports = router;
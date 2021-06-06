const mongoose = require("mongoose")

const product_schema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    reviews: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('Product',product_schema);

module.exports = {
    Product: Product,
    product_schema: product_schema
}
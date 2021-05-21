const mongoose = require("mongoose")

const schema = mongoose.Schema({
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

const Product = mongoose.model('Product',schema);

module.exports = Product;
const mongoose = require("mongoose");
const product = require("./Products")

const schema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        length: 6
    },
    role: {
        type: String,
        default: "User"
    },
    isVerified: {
        type: Boolean,
        default: false 
    },
    VerificationToken: {
        type: String,
    },
    Liked_items: {
        type: [product.product_schema]
    }
})

const User = mongoose.model('User', schema);

module.exports = User; 
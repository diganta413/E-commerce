const mongoose = require("mongoose");

const schema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
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
    }
})

const User = mongoose.model('User', schema);

module.exports = User; 
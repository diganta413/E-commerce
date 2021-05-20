const mongoose = require("mongoose");

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
    }
})

const User = mongoose.model('User', schema);

module.exports = User; 
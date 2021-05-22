const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    }
})

const category = mongoose.model('Categorie',schema)

module.exports = category;
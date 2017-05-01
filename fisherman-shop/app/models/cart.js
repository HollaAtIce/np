const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Cart = new Schema({
    user: {
        type: Schema.Types.ObjectId
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }]
})

module.exports = mongoose.model('cart', Cart)
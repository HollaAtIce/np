const cart = require('../models/cart')

module.exports = cartService

function cartService() {
    return {
        get,
        add,
        remove
    }

    function get(queryCondition = {}) {
        return cart.find(queryCondition).populate('products')
    }

    function add(req) {
        let queryCondition = {}
        let update = {
            $addToSet: { products: req.params.id }
        }
        return cart.findOneAndUpdate(queryCondition, update, { new: true }).populate('products')
    }

    function remove(req) {
        let queryCondition = {}
        let update = {
            $pullAll: { products: [req.params.id] }
        }
        return cart.findOneAndUpdate(queryCondition, update, { new: true })
    }
}

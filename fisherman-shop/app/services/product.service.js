const product = require('../models/product')

module.exports = productService

function productService() {
    return {
        get,
        getOne
    }

    function get(queryCondition = {}) {
        return product.find(queryCondition)
    }

    function getOne(req) {
        let queryCondition = {_id: req.params.id}
        return product.findOne(queryCondition)
    }
}
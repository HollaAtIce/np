const productService = require('../services/product.service')()

module.exports = productController

function productController() {
    return {
        get,
        getOne
    }

    function get(req, res) {
        productService.get()
            .then(docs => res.json(docs))
            .catch(err => res.json(err))
    }

    function getOne(req, res) {
        productService.getOne(req)
            .then(docs => res.json(docs))
            .catch(err => res.json(err))
    }
}

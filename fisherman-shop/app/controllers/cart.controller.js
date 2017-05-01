const cartService = require('../services/cart.service')()
const router = require('express').Router()

module.exports = cartController

function cartController() {
    return {
        get,
        add,
        remove
    }

    function get(req, res) {
        cartService.get()
            .then(docs => res.json(docs))
            .catch(err => res.json(err))
    }

    function add(req, res) {
        cartService.add(req)
            .then(docs => res.json(docs))
            .catch(err => res.json(err))
    }

    function remove(req, res) {
        cartService.remove(req)
            .then(docs => res.json(docs))
            .catch(err => res.json(err))
    }
}

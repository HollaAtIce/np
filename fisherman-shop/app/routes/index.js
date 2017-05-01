const router = require('express').Router()

router.use('/api/cart', require('./cart'))

router.use('/api/products', require('./products'))

module.exports = router
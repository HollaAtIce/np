const router = require('express').Router()
const path = require('path')

router.use('/api/cart', require('./cart'))
router.use('/api/products', require('./products'))

const index = path.resolve(__dirname, '../../public/index.html')
router.get('/*', (req, res) => res.sendFile(index))

module.exports = router
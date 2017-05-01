const router = require('express').Router()
const productController = require('../controllers/product.controller')()

router.get('/', productController.get)
router.get('/:id', productController.getOne)

module.exports = router

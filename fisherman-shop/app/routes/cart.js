const router = require('express').Router()
const cartController = require('../controllers/cart.controller')()

router.get('/', cartController.get)
router.post('/add/:id', cartController.add)
router.post('/remove/:id', cartController.remove)


module.exports = router

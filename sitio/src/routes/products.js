var express = require('express');
var router = express.Router();

const {detail,cart} = require('../controllers/productsController');

router.get('/cart',cart);
router.get('/detail/:id',detail)


module.exports = router;
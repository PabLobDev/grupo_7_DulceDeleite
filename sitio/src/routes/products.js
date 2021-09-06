var express = require('express');
var router = express.Router();

const {detail,cart, categoryViewPos, categoryViewMuf, categoryViewTor, categoryViewSal} = require('../controllers/productsController');

router.get('/cart',cart);
router.get('/detail',detail);
router.get('/categoriesPos', categoryViewPos);
router.get('/categoriesMuf', categoryViewMuf);
router.get('/categoriesTor', categoryViewTor);
router.get('/categoriesSal', categoryViewSal);


module.exports = router;
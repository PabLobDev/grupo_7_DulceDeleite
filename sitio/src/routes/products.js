var express = require('express');
var router = express.Router();

const {detail,cart, categoryViewPos, categoryViewMuf, categoryViewTor, categoryViewSal} = require('../controllers/productsController');

router.get('/cart',cart);
<<<<<<< HEAD
router.get('/detail/:id',detail)
=======
router.get('/detail',detail);
router.get('/categoriesPos', categoryViewPos);
router.get('/categoriesMuf', categoryViewMuf);
router.get('/categoriesTor', categoryViewTor);
router.get('/categoriesSal', categoryViewSal);
>>>>>>> cec501aa199c2b7bf08f3688f3932caac9fea50e


module.exports = router;
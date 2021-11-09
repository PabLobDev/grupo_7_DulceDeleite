const router = require('express').Router()
const {listCategories, listProducts,detailProducts} = require('../../controllers/api/productsControllers');

/* /api */
router 
    .get('/categories',listCategories)
    .get('/products',listProducts)
    .get('/products/:id',detailProducts)

module.exports = router
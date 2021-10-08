var express = require('express');
var router = express.Router();
const {index, create, store, edit, update, destroy} = require('../controllers/adminController');

const upload = require('../middlewares/productImageStore');
const productsCreateValidator = require('../validations/productsCreateValidator');

router.get('/productCreate', create);
router.post('/productCreate',upload.single('image'),productsCreateValidator, store);

router.get('/productsList', index);

router.get('/edit/:id', edit);
router.put('/update/:id',upload.single('image'),productsCreateValidator, update);

router.delete('/delete:id', destroy)




module.exports = router;

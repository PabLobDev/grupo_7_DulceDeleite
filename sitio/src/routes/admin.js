var express = require('express');
var router = express.Router();
const {index, create, store, edit, update, destroy} = require('../controllers/adminController');

const upload = require('../middlewares/productImageStore');
const productsCreateValidator = require('../validations/productsCreateValidator');

router.get('/productCreate', create);
router.post('/productCreate',upload.single('imagen'),productsCreateValidator, store);

router.get('/productsList', index);

router.get('/productEdit:id', edit);
router.put('/productEdit:id', update);

router.delete('/delete:id', destroy)




module.exports = router;

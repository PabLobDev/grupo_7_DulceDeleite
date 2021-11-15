var express = require('express');
var router = express.Router();
const {index, create, store, edit, update, destroy, admin} = require('../controllers/adminController');

const upload = require('../middlewares/productImageStore');
const productsCreateValidator = require('../validations/productsCreateValidator');
const adminUserCheck = require('../middlewares/adminUserCheck');
const productsEditValidator = require('../validations/productEditValidator');

router
      .get('/productCreate',adminUserCheck, create)
      .post('/productCreate',upload.single('image'),productsCreateValidator, store)

      .get('/productsList',adminUserCheck, index)
      .get('/productsTable',adminUserCheck, admin)

      .get('/edit/:id',adminUserCheck, edit)
      .put('/update/:id',upload.single('image'),productsEditValidator, update)

      .delete('/delete/:id',adminUserCheck, destroy)

module.exports = router;

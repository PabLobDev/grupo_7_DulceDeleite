var express = require('express');
var router = express.Router();
const {index, create, store, edit, update, remove, destroy} = require('../controllers/adminController');

const upload = require('../middlewares/productImageStore');
const productsCreateValidator = require('../validations/productsCreateValidator');

router
      .get('/productCreate', create)
      .post('/productCreate',upload.single('image'),productsCreateValidator, store)

      .get('/productsList', index)

      .get('/edit/:id', edit)
      .put('/update/:id',upload.single('image'),productsCreateValidator, update)

      .get('/remove/:id',remove)
      .delete('/delete/:id',destroy)

module.exports = router;

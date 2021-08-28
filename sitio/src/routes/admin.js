var express = require('express');
var router = express.Router();
const {index, create, store, edit, update} = require('../controllers/adminController');

router.get('/productCreate', create);
router.get('/products', index)

router.get('/edit', edit);







module.exports = router;

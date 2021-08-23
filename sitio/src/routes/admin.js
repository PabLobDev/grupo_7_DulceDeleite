var express = require('express');
var router = express.Router();
const {index,store,edit,update} = require('../controllers/adminController');

router.get('/',index);

router.get('/edit', edit);







module.exports = router;

var express = require('express');
var router = express.Router();


const {home, search,nosotros,recetas} = require('../controllers/indexController');


/* GET home page. */
router.get('/', home);

/* search */
router.get('/search', search);

/* nosotros */
router.get('/nosotros',nosotros);

/* recetas */
router.get('/recetas',recetas)

module.exports = router;

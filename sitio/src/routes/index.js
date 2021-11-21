var express = require('express');
var router = express.Router();


const {home, search,nosotros,recetas,contacto} = require('../controllers/indexController');


/* GET home page. */
router.get('/', home);

/* search */
router.get('/search', search);

/* nosotros */
router.get('/nosotros',nosotros);

/* recetas */
router.get('/recetas',recetas);

/* contacto */
router.get('/contacto',contacto);

module.exports = router;

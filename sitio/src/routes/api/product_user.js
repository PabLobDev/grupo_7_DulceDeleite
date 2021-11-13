var express = require('express');
var router = express.Router();

const { show, add ,remove, empty } = require('../../controllers/api/product_userController');

// endpoints: /api/product_user 

router
    .get('/show', show)
    .get('/add/:id', add)
    .get('/remove/:id',remove)
    .get('/empty',empty)

module.exports = router;
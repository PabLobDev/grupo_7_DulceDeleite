const router = require('express').Router()
const {listUsers,detailUsers} = require('../../controllers/api/apiUsers');

/* /api */
router 
    .get('/listUsers',listUsers)
    .get('/users/:id',detailUsers)

module.exports = router
const router = require('express').Router()
const {listUsers,detailUsers,getMails} = require('../../controllers/api/usersControllers');

/* /api */
router 
    .get('/users',listUsers)
    .get('/users/:id',detailUsers)
    .get('/emails',getMails)
    
    

module.exports = router
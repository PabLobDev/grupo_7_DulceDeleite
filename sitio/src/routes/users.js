var express = require('express');
var router = express.Router();

const {register,processRegister,login} = require('../controllers/usersController');
const usersRegisterValidator = require('../validations/usersRegisterValidator');

router.get('/register', register);
router.post('/register',usersRegisterValidator, processRegister);
router.get('/login', login);

module.exports = router;

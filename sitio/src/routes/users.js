var express = require('express');
var router = express.Router();

const {register,processRegister,login,profile,logout} = require('../controllers/usersController');
const usersRegisterValidator = require('../validations/usersRegisterValidator');

router.get('/register', register);
router.post('/register',usersRegisterValidator, processRegister);
router.get('/login', login);


router.get('/profile',profile);
router.get('/logout',logout);

module.exports = router;

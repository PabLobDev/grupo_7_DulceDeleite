var express = require('express');
var router = express.Router();

const {register,processRegister,login, processLogin, profile,logout,update} = require('../controllers/usersController');
const usersRegisterValidator = require('../validations/usersRegisterValidator');
const loginValidator = require('../validations/loginvalidator');


const avatarUserStorage =require('../middlewares/avatarUserStorage');
const profileValidator = require('../validations/profileValidator');

router.get('/register', register);
router.post('/register',usersRegisterValidator, processRegister);
router.get('/login', login);
router.post('/login', loginValidator, processLogin)

router.get('/profile',profile);
router.put('/profile',avatarUserStorage.single('avatar'),profileValidator, update);
router.get('/logout',logout);


module.exports = router;

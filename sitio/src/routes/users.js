var express = require('express');
var router = express.Router();

const {register,processRegister,login, processLogin, profile,editProfile,updateProfile,logout,destroy,buy} = require('../controllers/usersController');
const usersRegisterValidator = require('../validations/usersRegisterValidator');
const loginValidator = require('../validations/loginvalidator');
const avatarUserStorage =require('../middlewares/avatarUserStorage');
const profileValidator = require('../validations/profileValidator');

router
      .get('/register', register)
      .post('/register',usersRegisterValidator, processRegister)

      .get('/login', login)
      .post('/login', loginValidator, processLogin)

      .get('/profile/:id', profile)
      .get('/edit', editProfile)
      .put('/update',avatarUserStorage.single('avatar'),profileValidator, updateProfile)

      .get('/logout',logout)
      .delete('/delete/:id', destroy)

      //Formulario de compra con tarjeta de crédito
      .get('/buyForm', buy)


module.exports = router;

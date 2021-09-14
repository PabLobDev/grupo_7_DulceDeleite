const {check, body} = require('express-validator');
const users = require('../data/users.json')
const bcrypt = require('bcryptjs')

module.exports = [
   check('email')
    .isEmail().withMessage('Ingrese un email válido')
    .custom((value,{req}) => {
        let user = users.find(user => user.email === value.trim() && bcrypt.compareSync(req.body.pass.trim(), user.pass) )
        if(user){
            return true
        }else{
            return false
        }
    }).withMessage('Credenciales no validas'),
]
const {check, body} = require('express-validator');
const db = require('../database/models');
const bcrypt = require('bcryptjs'); 


module.exports = [
    check('name')
    .notEmpty().withMessage('El nombre es obligatorio'),

    body('surname')
    .notEmpty().withMessage('El apellido es obligatorio'),

    body('age')
    .notEmpty().withMessage('La edad es obligatoria'),

    body('city')
    .notEmpty().withMessage('Debe indicar la ciudad'),

    body('passOld')
    .notEmpty().withMessage('Debe introducir su contraseña').bail()
    .custom((value,{req}) => {

        return db.User.findOne({
            where: {
                id: req.session.userLogin.id
            }
        })
            .then(user => {
                if (value != "") {
                    if (bcrypt.compareSync(value, user.pass)) {
                        return true;
                    } else {
                        return Promise.reject('La contraseña no coincide');
                    }
                }
                
            })
             
    }),
    
    body('pass')
    .custom((value,{req}) => {
        if(value != ""){
            
            if(value.length === 8 ){
                return true
            }else{
                return false
            }
        }
        return true
    }).withMessage('La contraseña debe tener 8 caracteres'),
    

    body('pass2')
    .custom((value,{req}) => {
        if(value !== req.body.pass && value.length != 0){
            return false
        }
        return true
    }).withMessage('La verificación de la contraseña no coincide')
   

]
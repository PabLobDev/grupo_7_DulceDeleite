const {check, body} = require('express-validator');
const db = require('../database/models');

module.exports = [
    body('name')
    .notEmpty().withMessage('El nombre es obligatorio'),

    body('surname')
    .notEmpty().withMessage('El apellido es obligatorio'),

    body('age')
    .notEmpty().withMessage('La edad es obigatoria'),

    body('city')
    .notEmpty().withMessage('Debe indicar la ciudad'),

    body('email')
    .isEmail().withMessage('Ingrese un email válido')
    .custom(value => {
        return db.User.findOne({
            where: {
                email: value
            }
        })
            .then(user => {
                if (user) {
                    return Promise.reject('El email ya se encuentra registrado')
                }
            })
    }),

    body('pass')
    .isLength({
        max : 8,
        min : 8
    }).withMessage('Debe tener 8 caracteres'),

    body('pass2')
    .custom((value,{req}) => {
        if(value !== req.body.pass){
            return false
        }
        return true
    }).withMessage('La verificación de la contraseña no coincide'),

    check('terms')
    .isString('on').withMessage('Debe aceptar los términos y condiciones')
]
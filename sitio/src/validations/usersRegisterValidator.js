const { check, body } = require('express-validator');
const db = require('../database/models');

module.exports = [
    check('name')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({
            min: 2,
            max: 50
        }).withMessage('Como mínimo 2  y máximo 50 caracteres').bail()
        .isAlpha().withMessage('El nombre solo debe contener letras'),

    check('surname')
        .notEmpty().withMessage('El apellido es obligatorio').bail()
        .isLength({
            min: 2,
            max: 50
        }).withMessage('Como mínimo 2  y máximo 50 caracteres').bail()
        .isAlpha().withMessage('El nombre solo debe contener letras'),

    check('age')
        .notEmpty().withMessage('La edad es obigatoria').bail(),

    check('city')
        .notEmpty().withMessage('Debe indicar la Ciudad').bail()
        .isLength({
            min: 2,
            max: 50
        }).withMessage('Como mínimo 2  y máximo 50 caracteres').bail(),


    check('email')
        .isEmail().withMessage('Debe ingresar un email válido'),
    body('email')
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

    check('password')
        .isLength({
            min : 6,
            max : 12
        }).withMessage('La contraseña debe tener 6 y 12 caracteres, al menos una mayuscula, una minuscula y un numero'),

    body('pass2')
        .custom((value, { req }) => {
            if (value !== req.body.pass) {
                return false
            }
            return true
        }).withMessage('La verificación de la contraseña no coincide'),

    check('terms')
        .isString('on').withMessage('Debe aceptar los términos y condiciones')
]
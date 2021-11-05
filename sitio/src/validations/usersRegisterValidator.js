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

    check('pass')
        .isLength({
            min: 8,
            max: 8
        }).withMessage('Debe tener 8 caracteres'),

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
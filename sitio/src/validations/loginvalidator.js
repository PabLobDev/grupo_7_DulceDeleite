const { check,body} = require('express-validator');
const db = require('../database/models')
const bcryptjs = require('bcryptjs')

module.exports = [
    check('email')
    .isEmail().withMessage('Debe ingresar un email válido'),
    body('email')
    .custom((value,{req}) => {
        
        return db.User.findOne({
            where : {
                email : value,
            }
        })
            .then(user => {
                if(!user || !bcryptjs.compareSync(req.body.pass, user.pass)){
                    return Promise.reject()
                }
            }).catch( () => Promise.reject('Credenciales inválidas'))
    }),
    check('pass')
    .isLength({
        min: 6,
        max: 12
    }).withMessage('Debe tener entre 6 y 12 caracteres'),

]
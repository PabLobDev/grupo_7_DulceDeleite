const { body} = require('express-validator');
const db = require('../database/models')
const bcryptjs = require('bcryptjs')

module.exports = [
    body('email')
    .custom((value,{req}) => {
        
        return db.User.findOne({
            where : {
                email : value,
            }
        })
            .then(user => {
                if(!user || !bcryptjs.compareSync(req.body.pass, user.pass)){
                    return Promise.reject('Email o contraseña incorrectas')
                }
            }).catch( () => Promise.reject('Credenciales inválidas'))
    })
]
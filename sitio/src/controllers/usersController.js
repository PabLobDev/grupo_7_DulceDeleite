const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

module.exports = {
    //Renderiza vista de usuario
    register: (req, res) => {
        return res.render('users/register', {
            title: "Registrarse"
        })
    },
    //Proceso de registro de usuario
    processRegister: (req, res) => {

        let errors = validationResult(req)

        if (errors.isEmpty()) {

            const { name, surname, age, city, email, pass } = req.body;

            db.User.create({
                name: name.trim(),
                surname: surname.trim(),
                age: +age,
                city: city.trim(),
                email: email.trim(),
                pass: bcrypt.hashSync(pass.trim(), 10),
                rolId: 1,
                avatar: 'avatar_default.png'
            })
                .then(user => {
                    req.session.userLogin = {
                        id: user.id,
                        name: user.name,
                        surname: user.surname,
                        age: user.age,
                        city: user.city,
                        email: user.email,
                        avatar: user.avatar,
                        rolId: user.rolId
                    }

                    req.session.cart = [];

                    return res.redirect('/')
                })
                .catch(error => console.log(error))
        } else {
            return res.render('users/register', {
                title: "Algo falló",
                errors: errors.mapped()
            })
        }
    },
    //Renderiza vista login
    login: (req, res) => {
        return res.render('users/login', {
            title: "Login"
        })
    },
    //Proceso de logueo de usuario     
    processLogin: (req, res) => {

        let errors = validationResult(req);

        if (errors.isEmpty()) {

            const { email, recordar } = req.body;

            db.User.findOne({
                where: {
                    email
                }
            })
                .then(user => {
                    req.session.userLogin = {
                        id: user.id,
                        name: user.name,
                        surname: user.surname,
                        age: user.age,
                        city: user.city,
                        email: user.email,
                        avatar: user.avatar,
                        rolId: user.rolId
                    }
                    if (recordar) {
                        res.cookie('ddLogin', req.session.userLogin, { maxAge: 900000 * 100 * 100 * 10000 })
                    }

                    /* CARRITO */

                    req.session.cart = [];

                    db.Order.findOne({
                        where: {
                            userId: req.session.userLogin.id,
                            status: 'pending'
                        },
                        include: [
                            {
                                association: 'product_user',
                                include: [
                                    {
                                        association: 'product',
                                        include: ['category']
                                    }
                                ]
                            }
                        ]
                    }).then(order => {
                        if (order) {
                            order.product_user.forEach(item => {
                                let product = {
                                    id: item.productId,
                                    name: item.product.name,
                                    image: item.product.image,
                                    price: item.product.price,
                                    category: item.product.category.name,
                                    cantidad: +item.quantity,
                                    subtotal: item.product.price * item.quantity,
                                    orderId: order.id
                                }
                                req.session.cart.push(product)
                            })
                            console.log(req.session.cart)
                        }
                        return res.redirect('../')
                    })
                })

        } else {
            return res.render('users/login', {
                title: 'Algo falló',
                errors: errors.mapped()
            })
        }
    },

    //Formulario de compra con tarjeta de crédito
    buy: (req, res) => {
        return res.render('users/buyForm', {
            title: "Formulario de pago"
        })
    },

    //Perfil de usuario
    profile: (req, res) => {

        db.User.findByPk(req.session.userLogin.id)

            .then((user) => {

                return res.render('users/profile', {
                    user
                })
            })
            .catch(error => console.log(error))

    },

    editProfile: (req, res) => {

        db.User.findByPk(req.session.userLogin.id)

            .then((user) => {

                return res.render('users/editProfile', {
                    user,
                    title: 'Editar perfil'
                })
            })
            .catch(error => console.log(error))

    },

    updateProfile: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            const { name, surname, age, city, email, pass } = req.body;

            db.User.update(
                {
                    name: name.trim(),
                    surname: surname.trim(),
                    age: +age,
                    city: city.trim(),
                    email: email.trim(),
                    pass: req.body.pass ? bcrypt.hashSync(pass.trim(), 10) : req.session.userLogin.pass,
                    avatar: req.file ? req.file.filename : req.body.avatar
                },
                {
                    where: {
                        id: req.session.userLogin.id
                    }
                }
            )
                .then(() => {
                    
                    return res.redirect('/')
                })
                .catch(error => console.log(error))


        } else {

            db.User.findByPk(req.session.userLogin.id)

                .then((user) => {

                    return res.render('users/editProfile', {
                        user,
                        title: 'Editar perfil',
                        errors: errors.mapped()
                    })
                })
                .catch(error => console.log(error))
        }

    },


    //Cierra sesion
    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/')
    },

    destroy: (req, res) => {

        db.User.findByPk(req.session.userLogin.id)
            .then(userLogin => {
                if(userLogin.avatar != 'avatar_default.png'){
                    fs.existsSync(path.join(__dirname,'../../public/images/users',userLogin.avatar)); 
                    fs.unlinkSync(path.join(__dirname,'../../public/images/users',userLogin.avatar)); 
                }
            });
        db.User.destroy({
            where: {
                id: req.session.userLogin.id
            }
        }).then((response) => {
            console.log(response)
            req.session.destroy()
            res.clearCookie('ddLogin')
            return res.redirect('/')
        }).catch(error => console.log(error))
    }
}
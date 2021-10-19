const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

module.exports = {
    register: (req, res) => {
     return res.render('users/register', {
         title : "Registrarse"
     })},

     processRegister : (req,res) => {

        let errors = validationResult(req);
        
        if(errors.isEmpty()){
            
            const {name, surname, age, city, email, pass} = req.body;

            db.User.create ({
                name : name.trim(),
                surname : surname.trim(),
                age : +age,
                city: city.trim(),
                email : email.trim(),
                pass : bcrypt.hashSync(pass.trim(),10),
                rolId : 1,
                avatar : 'avatar_default.png'
            })
               .then(user => {
            req.session.userLogin = {
                id : user.id,
                name : user.name,
                avatar : user.avatar,
                rolId : user.rolId
            }
            return res.redirect('/users/login')
        })
        .catch(error => console.log(error))
        }else{
            return res.render('users/register',{
                title : "Algo no anduvo bien",
                errors : errors.mapped()
            })
        }
    },

    login: (req, res) => {
            return res.render('users/login', {
                title : "Login"
            })},

    processLogin : (req,res) => {
                let errors = validationResult(req);
        
        if(errors.isEmpty()){
            
            const {email,recordar} = req.body;

             db.User.findOne({
                 where : {
                     email
                 }
             })
             .then(user => {

            req.session.userLogin = {
                id : user.id,
                name : user.name,
                avatar : user.avatar,
                rolId : user.rolId
            }
             if(req.body.recordar){
                res.cookie('ddLogin', req.session.userLogin, {maxAge : 2000 * 60 })
            }
            res.redirect('../')
        })
        }else{
            return res.render('users/login',{
            title : "Intentalo de nuevo",
            errors : errors.mapped()
        })}
    },

    profile : (req,res) => {
        res.render('users/profile',{
            user : users.find(user => user.id === +req.session.userLogin.id)
        })
    },
   
    
    logout : (req,res) => {
        req.session.destroy();
        return res.redirect('/')
    }
}
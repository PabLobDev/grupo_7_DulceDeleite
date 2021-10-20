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
             if(recordar){
                res.cookie('ddLogin', req.session.userLogin, {maxAge : 20000 * 100 })
            }
            res.redirect('../')
        })
        }else{
            return res.render('users/login',{
            title : 'Algo falló',
            errors : errors.mapped()
        })}
    },

    profile : (req,res) => {
 
        db.User.findByPk(req.params.id)
            
           .then((user) => {
              
               return res.render('users/profile',{
                   user
               })
           })
           .catch(error => console.log(error))
 
   },
   
    
    logout : (req,res) => {
        req.session.destroy();
        return res.redirect('/')
    }
}
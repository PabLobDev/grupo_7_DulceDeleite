const fs = require('fs');
const path = require('path');
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
                surname : user.surname,
                age : user.age,
                city : user.city,
                email : user.email,
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

   editProfile : (req,res) => {
     
    db.User.findByPk(req.session.userLogin.id)
   
    .then((user) => {
          
       return res.render('users/editProfile',{
           user,
           title :'Editar perfil'
       })
   })
   .catch(error => console.log(error))

},

updateProfile : (req,res) => {
   let errors = validationResult(req);
  
   if(errors.isEmpty()){
       
       const {name,surname,age,city,email,pass} = req.body;
        
       db.User.update(
           {
           name : name.trim(),
           surname : surname.trim(),
           age : +age,
           city : city.trim(),
           email : email.trim(),
           pass : req.body.pass ? bcrypt.hashSync(pass.trim(),10) : req.session.userLogin.pass,
           avatar: req.file ? req.file.filename : req.body.avatar
           },
           {
               where : {
                   id : req.session.userLogin.id
               }
           }
          )
           .then(() => {
               req.session.destroy();
               return res.redirect('/')
           })
           .catch(error => console.log(error))

      
   }else{
      
       db.User.findByPk(req.session.userLogin.id)
   
    .then((user) => {
          
       return res.render('users/editProfile',{
           user,
           title :'Editar perfil',
           errores : errors.mapped()
       })
   })
   .catch(error => console.log(error))
   }
 
},
     
logout : (req,res) => {
        req.session.destroy();
        return res.redirect('/')
    },
destroy: (req,res) => {

    db.User.findByPk(req.session.userLogin.id)
    .then(user => {
            if(fs.existsSync(path.join(__dirname,'../../public/images/users',userLogin.avatar))){
                fs.unlinkSync(path.join(__dirname,'../../public/images/users',userLogin.avatar))   
        }});
        db.User.destroy({
            where : {
                id : req.session.userLogin.id
            }
        }).then( user => {
            
            req.session.destroy()
        res.clearCookie("remenber")
        return res.redirect('/')
        }).catch(error => console.log(error))
    }
}
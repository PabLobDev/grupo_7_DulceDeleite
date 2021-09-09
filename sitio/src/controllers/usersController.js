const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const users = require('../data/users.json');
const fs = require('fs');
const path = require('path');

module.exports = {
    register: (req, res) => {
     return res.render('users/register')},

     processRegister : (req,res) => {

        let errors = validationResult(req);
        
        if(errors.isEmpty()){
            
            const {name, last_name, age, city, email, pass} = req.body;

            let user = {
                id : users.length > 0 ? users[users.length - 1].id + 1 : 1,
                name : name.trim(),
                last_name : last_name.trim(),
                age : +age,
                city: city.trim(),
                email : email.trim(),
                pass : bcrypt.hashSync(pass.trim(),10),
                rol : 'user',
                avatar : 'avatar_default.png'
            }
            users.push(user);
            fs.writeFileSync(path.join(__dirname, '..','data','users.json'),JSON.stringify(users,null,2),'utf-8');

            req.session.userLogin = {
                id : user.id,
                name : user.name,
                avatar : user.avatar,
                rol : user.rol
            }
            return res.redirect('/')
        }else{
            return res.render('users/register',{
                old : req.body,
                errors : errors.mapped()
            })
        }
    },

    login: (req, res) => {
        return res.render('users/login')
    }
}
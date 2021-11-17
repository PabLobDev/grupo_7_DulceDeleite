const fs = require('fs');
const path = require('path');
const capitalize = require('../utils/capitalize');
const db = require('../database/models');
const {validationResult} = require('express-validator');

module.exports = {
    
    index: (req,res) => {
        db.Product.findAll()
        .then(products => {
                res.render("admin/productsList",{
                    products,
                    title: 'Todos los productos'
                })
            })
            .catch(error => console.log(error))
    },

    create  : (req,res) => {
        db.Category.findAll({
            order : [
                ['name','DESC']
            ]
        })
            .then(categories => res.render('admin/productCreate',{
                categories,
                title: 'Agregar producto'
            }))
            .catch(error => console.log(error))
    },

    store: (req,res) => {
       
        let errors = validationResult(req);

        if(errors.isEmpty()){
            const {name,price,discount,description,category,celiac,diabetic} = req.body;
            
            db.Product.create({
                
                name : name.trim(),
                price : +price,
                discount : +discount,
                description : description.trim(),
                categoryId : category,
                celiac : celiac ? true : false,
                diabetic : diabetic ? true : false,
                image:  req.file ? req.file.filename : 'default-image.png'
            })
            .then(product => {  
                console.log(product);
             return res.redirect('/admin/productsList')
             })
            .catch(error => console.log(error))

        }else{
            db.Category.findAll({
                order : [
                    ['name','DESC']
                ]
            })
                .then(categories => res.render('admin/productCreate',{
                categories,
                errores : errors.mapped(),
                old : req.body,
                
            })
                )}

    },
    
    edit : (req,res) => {
        let categories = db.Category.findAll({
            order : [
                ['name']
            ]
        })
        let product = db.Product.findByPk(req.params.id, {
            include : ['category']
        })
        Promise.all(([categories, product]))
            .then(([categories, product]) => {
                return res.render('admin/productEdit',{
                    categories,
                    product,
                    capitalize
                })
            })
            .catch(error => console.log(error))
	},

	update : (req,res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            
            const {name,price,discount,description,category,celiac,diabetic} = req.body;
             
            db.Product.update(
                {
                name : name.trim(),
                price : +price,
                discount : +discount,
                description : description.trim(),
                categoryId : category,
                celiac : celiac ? true : false,
                diabetic : diabetic ? true : false,
                image: req.file ? req.file.filename : req.body.image
                },
                {
                    where : {
                        id : req.params.id
                    }
                }
               )
                .then(response => {
                    console.log(response)
                    return res.redirect('/admin/productsTable')
                })
                .catch(error => console.log(error))

           
        }else{
            let categories = db.Category.findAll({
                order : [
                    ['name']
                ]
            })
            let product = db.Product.findByPk(req.params.id, {
                include : ['category']
            })
            Promise.all(([categories, product]))
                .then(([categories, product]) => {
                    return res.render('admin/productEdit',{
                        categories,
                        product,
                        errores : errors.mapped()
                    })
                })
                .catch(error => console.log(error))
        }
      
    },

    destroy: (req, res) => {

        db.Product.findByPk(req.params.id)
        .then(product => {
                if(fs.existsSync(path.join(__dirname,'../../public/images/productos',product.image))){
                    fs.unlinkSync(path.join(__dirname,'../../public/images/productos',product.image))   
            }});

        db.Product.destroy(
            {
                where : {
                    id : req.params.id
                }
            }
        )
        .then(product => {  
            console.log(product);
         return res.redirect('/admin/productsList')
         })

        .catch(error => console.log(error))
    },

    admin: (req, res) => {
        db.Product.findAll({
            order : [
                ['name']
            ],
            include : ['category']
            
        })
        .then(products=> {
                res.render("admin/productsTable",{
                    products,
                    title: 'Tabla de productos'
                })
            })
            .catch(error => console.log(error))
    },

    //Admministración de usuarios

    adminUsers: (req, res) => {
        db.User.findAll({
            order : [
                ['name']
            ],
            include : ['rol']
            
        })
        .then(users=> {
                res.render("admin/usersTable",{
                    users,
                    title: 'Tabla de usuarios'
                })
            })
            .catch(error => console.log(error))
    },

    userDestroy: (req, res) => {

        db.User.findByPk(req.params.id)
        .then(user => {
            if(user.avatar != 'avatar_default.png'){
                fs.existsSync(path.join(__dirname,'../../public/images/users',user.avatar)); 
                fs.unlinkSync(path.join(__dirname,'../../public/images/users',user.avatar)); 
            }
            })

        db.User.destroy(
            {
                where : {
                    id : req.params.id
                }
            }
        )
        .then(user => {  
            console.log(user);
         return res.redirect('/admin/usersTable')
         })

        .catch(error => console.log(error))
    }
}
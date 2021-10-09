const fs = require('fs');
const path = require('path');
const capitalize = require('../utils/capitalize');
const productos = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data','productos.json'),'utf-8'));
const categorias = require('../data/categorias.json');
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
    
    edit: (req, res) => {
		let producto = productos.find(producto => producto.id === +req.params.id);
		return res.render('./admin/productEdit', {
            title : "Editar producto",
			producto,
            productos,
            categorias,
            capitalize,
		})
	},
	update: (req, res) => {
		const {nombre, precio, descuento, descripcion, categoria} = req.body;

		productos.map(producto => {
			if(producto.id === +req.params.id){
				producto.nombre = nombre;
				producto.precio = +precio;
				producto.descuento = +descuento;
				producto.categoria = categoria;
				producto.descripcion = descripcion;		
			}
		})
        fs.writeFileSync(path.join(__dirname,'..','data','productos.json'),JSON.stringify(productos,null,2),'utf-8');
        return res.redirect('/admin/productsList')
	},
    destroy: (req, res) => {

        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(result => {
                return res.redirect("/admin/productsList")
            })
            .catch((error) => {
                res.send(error)
            })
    }
}
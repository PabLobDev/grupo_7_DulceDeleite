const fs = require('fs');
const path = require('path');
const capitalize = require('../utils/capitalize');
const productos = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data','productos.json'),'utf-8'));
const categorias = require('../data/categorias.json');

const {validationResult} = require('express-validator');

module.exports = {
    index : (req,res) => {
        return res.render('admin/productsList', {
          productos,
          categorias
        })      
    },

    create : (req,res) => {
        return res.render('admin/productCreate', {
            categorias,
            capitalize
        })
    },

    store: (req,res) => {
       
        let errors = validationResult(req);

        if(errors.isEmpty()){
            const {nombre,precio,descuento,descripcion,categoria,celiaquia,diabetes} = req.body;
       
            let producto = {
                id: productos[productos.length - 1].id + 1,
                nombre : nombre.trim(),
                precio : +precio,
                descuento : +descuento,
                descripcion : descripcion.trim(),
                categoria,
                celiaquia : celiaquia ? true : false,
                diabetes : diabetes ? true : false,
                imagen : req.file ? req.file.filename : 'default-image.png'
            }
              
            productos.push(producto)
            fs.writeFileSync(path.join(__dirname,'..','data','productos.json'),JSON.stringify(productos,null,2),'utf-8');
            return res.redirect('/')
        }else{
            return res.render('admin/productCreate',{
                categorias,
                productos,
                errores : errors.mapped(),
                old : req.body
            })
        }

    },

    edit: (req,res) => {
        return res.render('admin/productEdit')
    },

    update: (req,res) => {

    },

    destroy: (req,res) => {
       
    }
    
}
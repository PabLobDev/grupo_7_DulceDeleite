const fs = require('fs');
const path = require('path');
const productos = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','productos.json'),'utf-8'));
const categorias = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','categorias.json'),'utf-8'));
const db = require('../database/models');
const capitalize = require('../utils/capitalize');
const toThousand = require('../utils/toThousand')
const precioFinal = require('../utils/precioFinal');

module.exports = {
    detail : (req,res) => {
        let producto = productos.find(producto => producto.id === +req.params.id)
            return res.render('products/detail',{
                title : "Detalle del producto",
                productos,
                producto,
                capitalize,
                precioFinal,
                toThousand
            })

    },
    cart: (req, res) => {
        return res.render('products/cart',{
            title:"Tu carrito"
        })
    },
    categoryViewPos:(req,res) => {
        let postres = db.Category.findOne({
            where : {
                name : 'postres'
            },
            include : [
                {
                    association : 'products',
                    include : [
                        {association : 'category'}
                        
                    ]
                }
            ]
        })
        Promise.all([postres])
    
            .then(([postres]) => {
                return res.render('products/productsCatPostres',{
                    title : "postres",
                    postres : postres.products,
                    
                })
            })
            .catch(error => console.log(error))
    },

    categoryViewMuf: (req,res) => {
        let muffins = db.Category.findOne({
            where : {
                name : 'muffins cupcakes'
            },
            include : [
                {
                    association : 'products',
                    include : [
                        {association : 'category'}
                        
                    ]
                }
            ]
        })
        Promise.all([muffins])
    
            .then(([muffins]) => {
                return res.render('products/productsCatMuffins',{
                    title : "muffins cupcakes",
                    muffins : muffins.products,
                    
                })
            })
            .catch(error => console.log(error))
    },

     categoryViewTor: (req,res) => {
        let tortas = db.Category.findOne({
            where : {
                name : 'tortas'
            },
            include : [
                {
                    association : 'products',
                    include : [
                        {association : 'category'}
                        
                    ]
                }
            ]
        })
        Promise.all([tortas])
    
            .then(([tortas]) => {
                return res.render('products/productsCatTortas',{
                    title : "tortas",
                    tortas : tortas.products,
                    
                })
            })
            .catch(error => console.log(error))
    },

    categoryViewSal: (req,res) => {
        db.Product.findAll()
        .then(products => {
                res.render("products/productsCatSaludable",{
                    products,
                    title: 'Saludables'
                })
            })
            .catch(error => console.log(error))
    }

}

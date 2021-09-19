const fs = require('fs');
const path = require('path');
const productos = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','productos.json'),'utf-8'));
const categorias = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','categorias.json'),'utf-8'));

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
    categoryViewPos: (req,res) => {

            return res.render('products/productsCatPostres', {
                 title : "Postres",
                 productos,
                 categorias
                 
             })
  
    },

    categoryViewMuf: (req,res) => {

        return res.render('products/productsCatMuffins', {
            title : "Muffins y Cupcakes",
            productos,
            categorias
            
        })

     },

     categoryViewTor: (req,res) => {

        return res.render('products/productsCatTortas', {
            title : "Tortas",
            productos,
            categorias
            
        })

    },

    categoryViewSal: (req,res) => {

        return res.render('products/productsCatSaludable', {
            title : "Saludables",
            productos,
            categorias
            
        })

    }

}

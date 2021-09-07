const fs = require('fs');
<<<<<<< HEAD
const path = require('path');
const productos = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','productos.json'),'utf-8'));
const categorias = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','categorias.json'),'utf-8'));

const capitalize = require('../utils/capitalize');
const toThousand = require('../utils/toThousand')
const precioFinal = require('../utils/precioFinal');

module.exports = {
    detail : (req,res) => {
        let producto = productos.find(producto => producto.id === +req.params.id)
            return res.render('detail',{
                productos,
                producto,
                capitalize,
                precioFinal,
                toThousand
            })

    },
=======
const path = require('path')


const categorias = require('../data/categorias.json');
const productos = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data','productos.json'),'utf-8'));

module.exports = {
    detail: (req, res) => {
     return res.render('detail')},

>>>>>>> cec501aa199c2b7bf08f3688f3932caac9fea50e
    cart: (req, res) => {
        return res.render('cart')
    },

    categoryViewPos: (req,res) => {

            return res.render('productsCatPostres', {
                 productos,
                 categorias
                 
             })
  
    },

    categoryViewMuf: (req,res) => {

        return res.render('productsCatMuffins', {
            productos,
            categorias
            
        })

     },

     categoryViewTor: (req,res) => {

        return res.render('productsCatTortas', {
            productos,
            categorias
            
        })

    },

    categoryViewSal: (req,res) => {

        return res.render('productsCatSaludable', {
            productos,
            categorias
            
        })

    }

}

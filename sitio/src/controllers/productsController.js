const fs = require('fs');
const path = require('path')


const categorias = require('../data/categorias.json');
const productos = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data','productos.json'),'utf-8'));

module.exports = {
    detail: (req, res) => {
     return res.render('detail')},

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

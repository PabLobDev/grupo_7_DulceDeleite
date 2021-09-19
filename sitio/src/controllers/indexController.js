const fs = require('fs');
const path = require('path');
const categorias = require('../data/categorias.json')
const productos = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data','productos.json'),'utf-8'));

module.exports = {
    home : (req,res) => {
        return res.render('index',{
            title : "Dulce Deleite",
           productos,
           categorias
        })
    },

    search : (req,res) => {
        if(req.query.busqueda){
            let resultado = productos.filter(producto => producto.nombre.toLowerCase().includes(req.query.busqueda.toLowerCase()))
            return res.render('products/searchResults',{
                title : "Resultado de la búsqueda",
                productos : resultado,
                busqueda : req.query.busqueda.trim()
            })
        }
        return res.redirect('/')
    }
    
}
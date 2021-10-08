const fs = require('fs');
const path = require('path');
const categorias = require('../data/categorias.json')
const productos = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data','productos.json'),'utf-8'));

const db = require('../database/models');

module.exports = {
    home : (req,res) => {
        db.Product.findAll({
            order : [ 'name'],
            limit : 15
        })
        .then(products => {
                res.render("index",{
                    products,
                    title: 'Dulce Deleite'
                })
            })
            .catch(error => console.log(error))
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
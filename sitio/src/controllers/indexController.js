const fs = require('fs');
const path = require('path');
const categorias = require('../data/categorias.json')
const productos = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data','productos.json'),'utf-8'));

module.exports = {
    home : (req,res) => {
        return res.render('index',{
           productos,
           categorias
        })
    },
    
}
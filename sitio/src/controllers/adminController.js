const fs = require('fs');
const path = require('path');

const productos = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data','productos.json'),'utf-8'));


module.exports = {
    index : (req,res) => {
        return res.render('admin/products', {
          productos
        })      
    },

    create : (requ,res) => {
        return res.render('admin/productCreate')
    },

    store: (req,res) => {
        
    },

    edit: (req,res) => {
        return res.render('admin/productEdit')
    },

    update: (req,res) => {

    },

    destroy: (req,res) => {
        
    }
    
}
const fs = require('fs');
const path = require('path');
const productos = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','productos.json'),'utf-8'));
const categorias = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','categorias.json'),'utf-8'));

const capitalize = require('../utils/capitalize');

module.exports = {
    detail : (req,res) => {
        let producto = productos.find(producto => producto.id === +req.params.id)
            return res.render('detail',{
                productos,
                producto,
                capitalize,
            })

    },
    cart: (req, res) => {
        return res.render('cart')
    }
}

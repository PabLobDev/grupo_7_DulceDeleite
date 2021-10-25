const fs = require('fs');
const path = require('path');
const categorias = require('../data/categorias.json')
const productos = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'productos.json'), 'utf-8'));
const { Op } = require('sequelize');
const db = require('../database/models');

module.exports = {
    home: (req, res) => {
        db.Product.findAll({
            order: ['name'],
            limit: 15
        })
            .then(products => {
                res.render("index", {
                    products,
                    title: 'Dulce Deleite'
                })
            })
            .catch(error => console.log(error))
    },
    search: (req, res) => {
        db.Product.findAll({
            include: ['category'],
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.substring]: req.query.busqueda
                        }
                    },
                    {
                        description: {
                            [Op.substring]: req.query.busqueda
                        }
                    }
                ]
            }
        })
            .then(products => {
                return res.render('./products/searchResults', {
                    title: "Resultado de la búsqueda",
                    products,
                    busqueda: req.query.busqueda
                })
            })
            .catch(error => console.log(error))

    },
    nosotros: (req, res) => {
        res.render('nosotros')
    },
    recetas : (req, res) => {
        res.render('recetas')
    }
}
const { validationResult } = require('express-validator');
const capitalize = require('../../utils/capitalize');
const toThousand = require('../../utils/toThousand')
const precioFinal = require('../../utils/precioFinal');
const fs = require('fs');
const path = require('path');
const db = require('../../database/models');
const { Op } = require('sequelize');

const { AsyncResource } = require('async_hooks');

const throwError = (res, error) => {
    return res.status(error.status || 500).json({
        status: error.status || 500,
        errors: error.errors
    })
}

const getUrl = req => `${req.protocol}://${req.get('host')}${req.originalUrl}`


module.exports = {
    listCategories: async (req, res) => {
        try {
            let categorias = await db.Category.findAll({
                order: [
                    ['name', 'ASC']
                ]
            })

            let response = {
                status: 200,
                meta: {
                    total: categorias.length,
                    link: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data: categorias
            }
            return res.status(200).json(response)
        } catch (error) {
            throwError(res, error)
        }
    },
    listProducts: async (req, res) => {
        try {
            let products = await db.Product.findAll({
                include: ['category'],
            })

            let response = {
                status: 200,
                meta: {
                    total: products.length,
                    link: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data: products
            }
            return res.status(200).json(response)

        } catch (error) {
            throwError(res, error)
        }
    },
    detailProducts: async (req, res) => {
        try {
            if (Number.isNaN(+req.params.id)) {
                return throwError(res, {
                    status: 400,
                    errors: 'ID incorrecto'
                })
            }

            let product = await db.Product.findByPk(req.params.id, {
                include: ['category']
            })
            if (product) {
                let response = {
                    status: 200,
                    meta: {
                        link: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                    },
                    data: product
                }
                return res.status(200).json(response)
            } else {
                return throwError(res, {
                    status: 400,
                    errors: 'Producto inexistente'
                })
            }

        } catch (error) {
            console.log(error)
            throwError(res, error)
        }
    },
}
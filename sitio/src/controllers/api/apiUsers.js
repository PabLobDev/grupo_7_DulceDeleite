const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
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

listUsers:
 async (req, res) => {
    try {
        let users = await db.User.findAll({
            order : [
                ['surname', 'ASC']
            ]
        })

        let response = {
            status: 200,
            meta: {
                total: users.length,
                url: '/api/users'
            },
            data: users
        }
        return res.status(200).json(response)
    } catch (error) {
        let response = {
            status: error.status || 500,
            meta: {
                url: "/api/users"
            },
            error: error.errors
        }
        return res.status(res.status || 500).json(response)
    }},

detailUsers: async (req, res) => {
    try {
        let user = await db.User.findByPk(req.params.id)

        let response = {
            status: 200,
            meta: {
                url: '/api/users/' + req.params.id,
            },
            data: user
        }
        return res.status(200).json(response)
    } catch (error) {
        let response = {
            status: error.status || 500,
            meta: {
                url: "/api/users" + req.params.id
            },
            error: error.errors
        }
        return res.status(res.status || 500).json(response)
    }
},
}
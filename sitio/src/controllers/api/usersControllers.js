const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../../database/models');
const { Op } = require('sequelize');

const bcryptjs = require('bcryptjs');


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
                url: getUrl(req)
            },
            data: users
        }
        return res.status(200).json(response)
    } catch (error) {
        let response = {
            status: error.status || 500,
            meta: {
                url: getUrl(req)
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
getMails: async (req, res) => {
    try {
        let result = await db.User.findAll({
            attributes: ['email']
        })
        let emails = result.map(user => user.email)
        return res.status(200).json({
            meta: {
                link: getUrl(req),
                total: emails.length
            },
            data: emails
        })
    } catch (error) {
        console.log(error)
        throwError(res, error)

    }
},

verifyPassword: async (req, res) => {

    try {
        let user = await db.User.findOne({
            where: { email: req.body.email }
        })

        if (bcryptjs.compareSync(req.body.password, user.password)) {
            return res.status(200).json({ response: true })
        } else {
            return res.status(200).json({ response: false })
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ response: error })

    }

}


}
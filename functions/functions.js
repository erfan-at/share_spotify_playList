'use strict'
var moment = require("moment");
const Activity = require("../models/activity.model")
const jwt = require("jsonwebtoken");
const appConfig = require('../config/application')
module.exports = {



    generateAccessToken: function (username) {
        var TOKEN_SECRET = appConfig.salt;
        // expires after half and hour (1800 seconds = 30 minutes)
        return jwt.sign(username, TOKEN_SECRET, { expiresIn: '100d' });
    },


    checkUser: function (req, res, next) {
        request.get(config.clinicHostClinicAdmins + '/' + req.userId, (err1, res1, body1) => {
            if (err1) {
                console.log(err1)
                return res.status(500).send('خطایی رخ داده است، دوباره اقدام نمایید')
            } else {
                if (JSON.parse(res1.body).status == 'success') {
                    req.userData = JSON.parse(res1.body).data.clinicAdmin
                    req.userRole = JSON.parse(res1.body).data.clinicAdmin.role
                    next()
                } else return res.status(404).send('کاربر وجود ندارد')
            };
        })
    },

    authenticateTokenClinic: function (req, res, next) {
        // Gather the jwt access token from the request header
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401) // if there isn't any token
        // console.log('token', res.locals.TOKEN_SECRET)
        jwt.verify(token, config.clinicSalt, (err, userId) => {
            if (err) console.log(err)
            console.log(new Date())
            if (err) return res.status(403).send('نشست شما در سامانه منقضی شده است، لطفا مجددا به سامانه ورود نمایید.')
            req.userId = userId.username
            // console.log('req.userId', req.userId)
            next() // pass the execution off to whatever request the client intended
        })
    },

    recordActivity: async (userId, endPoint, body) => {
        try {
            return await Activity.create({
                "userId": userId,
                "endPoint": endPoint ? endPoint : '',
                "body": body ? JSON.stringify(body) : '',
                "date": moment(new Date()).format('X'),
                "softDelete": false
            })
        } catch (err) { console.log(err) }
    }
}
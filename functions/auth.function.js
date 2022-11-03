const jwt = require("jsonwebtoken");
const Activity = require("../models/activity.model")
const Model = require('../models/index')
const appConfig = require('../config/application')
module.exports = {

    generateAccessToken: async (username) => {
        return await jwt.sign(username, TOKEN_SECRET, { expiresIn: '100d' });
    },

    checkUserExist: async (req, res, next) => {
        try {
            const user = await Model.User.findById(req.userId);
            req.adminData = user
            next()
            // } else { return res.status(404).send('کاربر غیر فعال است') }

            // } else { return res.status(404).send('کاربر ادمین وجود ندارد') }
        } catch (error) {
            console.log(error);
            return res.status(404).send('کاربر ادمین در سامانه وجود ندارد')
        }
    },




    checkAdminExist: async (req, res, next) => {
        try {
            if (req.adminData.softDelete == false) {
                // if (req.adminData.active == true) {
                if (req.adminData.role == "admin") {
                    return next()
                } else { return res.status(403).send("کاربر ادمین دسترسی محتوا ندارد") }
                // } else { return res.status(404).send('کاربر غیر فعال است') }
            } else { return res.status(404).send('کاربر ادمین وجود ندارد') }
        } catch (error) {
            console.log(error);
            return res.status(404).send('کاربر ادمین در سامانه وجود ندارد')
        }
    },

    authenticateToken: function (req, res, next) {
        // Gather the jwt access token from the request header
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401) // if there isn't any token
        // console.log('token', res.locals.TOKEN_SECRET)
        jwt.verify(token, appConfig.salt, (err, userId) => {
            if (err) console.log(err)
            console.log(new Date())
            if (err) return res.status(403).send('نشست شما در سامانه منقضی شده است، لطفا مجددا به سامانه ورود نمایید.')
            req.userId = userId.username
            // console.log('req.userId', req.userId)
            return next() // pass the execution off to whatever request the client intended
        })
    },


    recordActivityFunc: function (userId, endPoint, body) {
        return promiseCheck = new Promise(function (resolve, reject) {
            Activity.create({
                "userId": userId,
                "endPoint": endPoint ? endPoint : '',
                "body": body ? JSON.stringify(body) : '',
                "date": moment(new Date()).format('X'),
                "softDelete": false
            }).then((activity) => {
                resolve({ code: 201, text: "Activity is submitted." });
            }).catch(error => {
                console.log(error)
                resolve({ code: 500, text: "لطفا دوباره تلاش کنید." });
            })
        })
    },

    recordActivity: async (req, res, next) => {
        var userId = req.userId
        var body = req.body
        var endPoint = req.originalUrl
        Activity.create({
            "userId": userId,
            "endPoint": endPoint ? endPoint : '',
            "body": body ? JSON.stringify(body) : '',
            "softDelete": false
        }).then((activity) => {
            return next()
        }).catch(error => {
            console.log("error for save a record activity middle == > : ", error)
            return res.status(409).send('خطایی رخ داده است لطفا دوباره اقدام نمایید')
        })
    }
}
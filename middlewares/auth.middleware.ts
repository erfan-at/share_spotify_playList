'use strict'
const jwt = require("jsonwebtoken");
const moment = require('jalali-moment');
const appConfig = require('../config/application')
const redisHandler = require('../library/redisHandler')
module.exports = {

    authenticateToken: (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)
        jwt.verify(token, appConfig.salt, (err, userId) => {
            console.log(new Date())
            if (err) {
                console.log(err)
                return res.status(403).send('نشست شما در سامانه منقضی شده است، لطفا مجددا به سامانه ورود نمایید.')
            }
            userId.username
            try {
                await redisHandler.get(userId.username)
            } catch (err) {

            }


            next()
        })
    },

    checkUserExist: async (req, res, next) => {
        try {
            const user = await User.findById(req.userId);
            if (user.softDelete == false) {
                if (user.active == true) {
                    if (user.role == "user") {
                        req.userData = user
                        req.userRole = "user"
                        next
                    } else { return res.status(404).send('کاربر وجود ندارد') }
                } else { return res.status(404).send('کاربر غیر فعال است') }
            } else { return res.status(404).send('کاربر  از سامانه حذف شده است') }
            return next();
        } catch (error) {
            console.log(error);
            return res.status(404).send('کاربر وجود ندارد')
        }
    },

    checkAdminExist: async (req, res, next) => {
        try {
            const user = await User.findById(req.userId);
            if (user.softDelete == false) {
                if (user.active == true) {
                    if (user.role == "admin") {
                        req.userData = user
                        req.userRole = "admin"
                        next()
                    } else { return res.status(404).send('کاربر ادمین وجود ندارد') }
                } else { return res.status(404).send('کاربر غیر فعال است') }
            } else { return res.status(404).send('کاربر ادمین وجود ندارد') }
        } catch (error) {
            console.log(error);
            return res.status(404).send('کاربر ادمین در سامانه وجود ندارد')
        }
    },

    recordActivity: async (req, res, next) => {
        try {
            await Activity.create({
                "userId": req.userId,
                "endPoint": req.originalUrl ? req.originalUrl : '',
                "body": req.body ? JSON.stringify(req.body) : '',
            })
            next()
        } catch (error) {
            console.log(error)
            return res.status(409).send('خطایی رخ داده است لطفا دوباره اقدام نمایید')
        }
    },
}
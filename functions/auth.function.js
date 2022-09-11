var moment = require("moment");
const Activity = require("../models/activity.model")
const jwt = require("jsonwebtoken");

const jwt = require("jsonwebtoken");
var TOKEN_SECRET = config.clinicSalt;

module.exports = {


    generateAccessToken: async (username) => {
        return await jwt.sign(username, TOKEN_SECRET, { expiresIn: '100d' });
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


    recordActivity: function (userId, endPoint, body) {
        let promiseCheck = new Promise(function (resolve, reject) {
            // await Activity.create({
            //     "userId": req.userId,
            //     "endPoint": req.originalUrl ? req.originalUrl : '',
            //     "body": req.body ? JSON.stringify(req.body) : '',
            // })
            axios.post(config.manageContactHostActivity, {
                userId: userId,
                endPoint: endPoint ? endPoint : "",
                body: body ? JSON.stringify(body) : "",
            }).then(function (responsePost) {
                if (responsePost.status == 201) {
                    resolve({ code: 201, text: "Activity is submitted." });
                } else resolve({ code: 500, text: "لطفا دوباره تلاش کنید." });
            }).catch(function (error) {
                console.log(error);
                resolve({ code: 500, text: "لطفا دوباره تلاش کنید." });
            });
        });
        return promiseCheck;
    },
}
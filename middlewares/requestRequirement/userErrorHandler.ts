'use strict'
module.exports = {
    userIdRequirementCheck: async (req, res, next) => {
        if (!req.body.userId) {
            return res.status(412).send("ارسال کردن  شناسه کاربر ضروری است!");
        }
        return next();
    },

    userIdQueryRequirementCheck: async (req, res, next) => {
        if (!req.query.userId) {
            return res.status(412).send("ارسال کردن  شناسه کاربر ضروری است!");
        }
        return next();
    },
}
'use strict'
const resBuilder = require('../../functions/responseBuilder')

module.exports = {
    createRequirementCheckPost: async (req, res, next) => {
        try {
            if (!req.body.text) { return resBuilder.invalidReq(res, "", "ارسال متن کامنت ضروری است") }
            if (!req.params.postId) {
                return resBuilder.invalidReq(res, "", "ارسال شناسه پست یا ضروری است ضروری است")
            }
            return next();
        } catch (error) { return resBuilder.internalFa(res) }

    },

    idRequirementCheck: async (req, res, next) => {
        try {
            if (!req.body.commentId) {
                return res.status(412).send("ارسال کردن شناسه درخواست ضروری است!");
            }
            return next();
        } catch (error) { return resBuilder.internalFa(res) }
    },
}


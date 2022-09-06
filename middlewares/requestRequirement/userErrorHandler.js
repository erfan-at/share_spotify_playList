const asyncHandler = require("express-async-handler");

module.exports = {
    userIdRequirementCheck: asyncHandler(async (req, res, next) => {
        if (!req.body.userId) {
            return res.status(412).send("ارسال کردن  شناسه کاربر ضروری است!");
        }
        next();
    }),

    userIdQueryRequirementCheck: asyncHandler(async (req, res, next) => {
        if (!req.query.userId) {
            return res.status(412).send("ارسال کردن  شناسه کاربر ضروری است!");
        }
        next();
    }),
}
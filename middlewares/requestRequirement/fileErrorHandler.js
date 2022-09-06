const asyncHandler = require("express-async-handler");

module.exports = {
    fileIdErrorHandler: asyncHandler(async (req, res, next) => {
        try {
            if (!req.body.fileId) {
                return res.status(412).send("! ارسال کردن شناسه فایل اجباری است");
            }
            next();
        } catch (error) {
            res.status(500).send("مشکلی پیش آمده است با پشتسبانی تماس بگیرید");
        }
    }),
}
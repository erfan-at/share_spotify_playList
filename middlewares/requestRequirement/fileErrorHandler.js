
module.exports = {
    fileIdErrorHandler: async (req, res, next) => {
        try {
            if (!req.body.fileId) {
                return res.status(412).send("! ارسال کردن شناسه فایل اجباری است");
            }
            return next();
        } catch (error) {
            res.status(500).send("مشکلی پیش آمده است با پشتسبانی تماس بگیرید");
        }
    },
}
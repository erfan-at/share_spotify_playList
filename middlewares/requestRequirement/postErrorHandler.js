
module.exports = {
    requestRegisterRequirementCheck: async (req, res, next) => {
        try {
            if (!req.body.title) {
                return res.status(412).send("ارسال کردن عنوان درخواست ضروری است!");
            }
            if (!req.body.description) {
                return res.status(412).send("ارسال کردن توضیحات درخواست ضروری است!");
            }
            if (!req.body.requirements) {
                return res.status(412).send("ارسال کردن جدول نیازمندیهای درخواست ضروری است!");
            }
            if (!req.body.type) {
                return res.status(412).send("ارسال کرد نوع درخواست ضروری است!");
            } else {
                if (req.body.type != "a" && req.body.type != "b" && req.body.type != "c") {
                    return res.status(412).send("ارسال کردن نوع درخواست صحیح ضروری است!");
                }
            }
            return next();
        } catch (error) {
            res.status(500).send("مشکلی پیش آمده است با پشتسبانی تماس بگیرید");
        }
    },

    RequestIdRequirementCheck: async (req, res, next) => {
        try {
            if (!req.body.requestId) {
                return res.status(412).send("ارسال کردن شناسه درخواست ضروری است!");
            }
            return next();
        } catch (error) {
            res.status(500).send("مشکلی پیش آمده است با پشتسبانی تماس بگیرید");
        }
    },
}
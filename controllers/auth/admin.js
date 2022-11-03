const { generateAccessToken } = require("../../functions/functions");
var { recordActivity } = require("../../functions/functions");
const md5 = require('md5')
const User = require("../../models/user.model")



module.exports = {

    adminLogin: async (req, res) => {
        try {
            if (!req.body.email && !req.body.mobile) { return resBuilder.invalidReq(res, "", "ارسال شماره موبایل یا آدرس ایمیل ضرروی است") }
            if (!req.body.password) { return resBuilder.invalidReq(res, "", "ارسال رمز عبور ضرروی است") }
            const userData = {
                role: "admin",
                email: req.body.email ? req.body.email : undefined,
                mobile: req.body.mobile ? req.body.mobile : undefined,
                password: cryptography.md5(req.body.password),
                softDelete: false
            }
            const user = await User.findOne({ userData })
            if (user) {
                if (!user.active) { return resBuilder.notFound(res, 'کاربر در سیستم غیر فعال شده است لطفا با پشتیبانی تماس بگیرید') }
                await recordActivity(user.id, "/auth/adminLogin", req.body);
                await redisHandler.put(user.id, cryptography.base64.encode(JSON.stringify({ user: user })))
                return resBuilder.success(res,
                    {
                        token: token = generateAccessToken({ username: user.id }), name: user.name, username: user.username, role: user.role
                    }, "")
            } else { return resBuilder.notFound(res, 'کاربری با این مشخصات در سبستم وجود ندارد') }
        } catch (err) {
            console.log(err)
            return resBuilder.internal(res)
        }
    },

    //send activationCode
    userResetPasswordActivationCode: async (req, res) => {
        try {
            if (!req.body.mobile) { return resBuilder.invalidReq(res, "", "ارسال شماره موبایل ضروری است") }
            const user = await User.findOne({ mobile: req.body.mobile, role: "admin", softDelete: false })
            if (user) {
                if (!user.active) { return resBuilder.notFound(res, 'کاربر در سیستم غیر فعال شده است لطفا با پشتیبانی تماس بگیرید') }
                await User.findByIdAndUpdate(user.id, { activationCode: Math.floor(Math.random() * 89999 + 10000) });
                await recordActivity(user.id, "/auth/adminResetPasswordActivationCode", req.body);
                // let smsPromise = await smsAuth('taleghan', req.body.mobile, activationCode)
                return resBuilder.success(res, "", ' کد بازیابی برای شما از طریق پیامک ارسال گردید.')
            } else { return resBuilder.notFound(res, 'کاربر فعالی با این شماره موبایل وجود ندارد') }
        } catch (err) {
            console.log(err)
            return resBuilder.internal(res)
        }
    },

    adminResetPassword: async (req, res) => {
        try {
            if (!req.body.mobile) { return resBuilder.invalidReq(res, "", "ارسال شماره موبایل ضروری است") }
            if (!req.body.password) { return resBuilder.invalidReq(res, "", "ارسال رمز عبور ضروری است") }
            if (!req.body.activationCode) { return resBuilder.invalidReq(res, "", "ارسال کد فعال سازی ضروری است") }
            const user = await User.findOne({ mobile: req.body.mobile, role: "admin", softDelete: false })
            if (!user) { return resBuilder.notFound('کاربری با این شماره موبایل وجود ندارد') }
            if (!user.active) { return resBuilder.notFound(res, 'کاربر در سیستم غیر فعال شده است لطفا با پشتیبانی تماس بگیرید') }
            if (user.activationCode != req.body.activationCode) { return resBuilder.invalidReq(res, '', 'کد بازیابی رمز عبور اشتباه است') }
            await User.findByIdAndUpdate(user.id, { password: cryptography.md5(req.body.password), activationCode: "" })
            await recordActivity(user.id, "/auth/adminResetPassword", req.body);
            return resBuilder.success(res, "", 'رمز عبور با موفقیت ویرایش گردید')
        } catch (err) {
            console.log(err)
            return resBuilder.internal(res)
        }
    }
}
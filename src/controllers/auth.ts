import { generateAccessToken } from "../../functions/functions";
// import { recordActivity } from "../../functions/functions";
import Service from '../service/index'
import Model from '../models/index'
import resBuilder from "../functions/responseBuilder";

export default {

    adminLogin: async (req, res) => {
        try {
            if (!req.body.email && !req.body.mobile) { return resBuilder.badRequest(res, "", "ارسال شماره موبایل یا آدرس ایمیل ضرروی است") }
            if (!req.body.password) { return resBuilder.badRequest(res, "", "ارسال رمز عبور ضرروی است") }
            const userData = {
                role: "admin",
                email: req.body.email ? req.body.email : undefined,
                mobile: req.body.mobile ? req.body.mobile : undefined,
                password: Service.cryptography.md5(req.body.password),
                softDelete: false
            }
            const user = await Model.User.findOne({ userData })
            if (user) {
                if (!user.active) { return resBuilder.notFound(res, 'کاربر در سیستم غیر فعال شده است لطفا با پشتیبانی تماس بگیرید') }
                await recordActivity(user.id, "/auth/adminLogin", req.body);
                await Service.redis.put(user.id, Service.cryptography.base64.encode(JSON.stringify({ user: user })))
                return resBuilder.success(res,
                    {
                        token: token = Service.cryptography.generateAccessToken({ username: user.id }), name: user.name, username: user.username, role: user.role
                    }, "")
            } else { return resBuilder.notFound(res, 'کاربری با این مشخصات در سبستم وجود ندارد') }
        } catch (err) {
            console.log(err)
            return resBuilder.internal(res)
        }
    },

    // //send activationCode
    // userResetPasswordActivationCode: async (req, res) => {
    //     try {
    //         if (!req.body.mobile) { return resBuilder.invalidReq(res, "", "ارسال شماره موبایل ضروری است") }
    //         const user = await User.findOne({ mobile: req.body.mobile, role: "admin", softDelete: false })
    //         if (user) {
    //             if (!user.active) { return resBuilder.notFound(res, 'کاربر در سیستم غیر فعال شده است لطفا با پشتیبانی تماس بگیرید') }
    //             await User.findByIdAndUpdate(user.id, { activationCode: Math.floor(Math.random() * 89999 + 10000) });
    //             await recordActivity(user.id, "/auth/adminResetPasswordActivationCode", req.body);
    //             // let smsPromise = await smsAuth('taleghan', req.body.mobile, activationCode)
    //             return resBuilder.success(res, "", ' کد بازیابی برای شما از طریق پیامک ارسال گردید.')
    //         } else { return resBuilder.notFound(res, 'کاربر فعالی با این شماره موبایل وجود ندارد') }
    //     } catch (err) {
    //         console.log(err)
    //         return resBuilder.internal(res)
    //     }
    // },

    // adminResetPassword: async (req, res) => {
    //     try {
    //         if (!req.body.mobile) { return resBuilder.invalidReq(res, "", "ارسال شماره موبایل ضروری است") }
    //         if (!req.body.password) { return resBuilder.invalidReq(res, "", "ارسال رمز عبور ضروری است") }
    //         if (!req.body.activationCode) { return resBuilder.invalidReq(res, "", "ارسال کد فعال سازی ضروری است") }
    //         const user = await User.findOne({ mobile: req.body.mobile, role: "admin", softDelete: false })
    //         if (!user) { return resBuilder.notFound('کاربری با این شماره موبایل وجود ندارد') }
    //         if (!user.active) { return resBuilder.notFound(res, 'کاربر در سیستم غیر فعال شده است لطفا با پشتیبانی تماس بگیرید') }
    //         if (user.activationCode != req.body.activationCode) { return resBuilder.invalidReq(res, '', 'کد بازیابی رمز عبور اشتباه است') }
    //         await User.findByIdAndUpdate(user.id, { password: cryptography.md5(req.body.password), activationCode: "" })
    //         await recordActivity(user.id, "/auth/adminResetPassword", req.body);
    //         return resBuilder.success(res, "", 'رمز عبور با موفقیت ویرایش گردید')
    //     } catch (err) {
    //         console.log(err)
    //         return resBuilder.internal(res)
    //     }
    // },


    // userSignup: async (req, res) => {
    //     try {
    //         // let userExist = await User.findOne({
    //         //     mobile: req.body.mobile,
    //         //     email: req.body.email,
    //         //     role: "user",
    //         //     softDelete: false,
    //         // })
    //         // if (userExist) {
    //         //     const user = {
    //         //         mobile: userExist.mobile ? userExist.mobile : undefined,
    //         //         email: userExist.email == req.body.email ? userExist.email : undefined,
    //         //     }
    //         //     return resBuilder.conflict(res, user, '.کاربری با این مشحصات وارده در سیستم وجود دارد ')
    //         // }
    //         user = new Model.User({
    //             name: req.body.name, mobile: req.body.mobile,
    //             password: cryptography.md5(req.body.password),
    //             email: req.body.email,
    //             mobile: req.body.mobile,
    //             username: req.body.username,
    //             role: "user"
    //         })
    //         await user.save();
    //         await recordActivity(user.id, "/auth/userSignup", req.body);
    //         return resBuilder.success(res, {
    //             token: generateAccessToken({ username: user.id }),
    //             name: user.name, username: user.username, role: user.role
    //         }, "حساب کاربری شما با موفقیت ایجاد شد")
    //     } catch (err) {
    //         if (err.name === 'MongoServerError' && err.code === 11000) {
    //             return resBuilder.conflict(res, "", `قبلا استفاده شده است ${Object.keys(err.keyPattern)[0]} این`)
    //         }
    //         console.log(err)
    //         return resBuilder.internalFa(res)
    //     }
    // },

    // userLogin: async (req, res) => {
    //     try {
    //         const userData = {
    //             role: "user",
    //             email: req.body.email ? req.body.email : undefined,
    //             mobile: req.body.mobile ? req.body.mobile : undefined,
    //             password: cryptography.md5(req.body.password),
    //             softDelete: false
    //         }
    //         const user = await Model.User.findOne({ userData })
    //         if (user) {
    //             if (!user.active) { return resBuilder.notFound(res, 'کاربر در سیستم غیر فعال شده است لطفا با پشتیبانی تماس بگیرید') }
    //             await recordActivity(user.id, "/auth/userLogin", req.body);
    //             // await redisHandler.put(user.id, cryptography.base64.encode(JSON.stringify({ user: user })))
    //             return resBuilder.success(res,
    //                 {
    //                     token: generateAccessToken({ username: user.id }), name: user.name, username: user.username, role: user.role
    //                 }, "")
    //         } else { return resBuilder.notFound(res, 'کاربری با این مشخصات در سبستم وجود ندارد') }
    //     } catch (err) {
    //         console.log(err)
    //         return resBuilder.internalFa(res)
    //     }
    // },

    // //login with mibile and activationCode
    // userEntrance: async (req, res) => {
    //     try {
    //         const user = await Model.User.findOne({ mobile: req.body.mobile, role: "user", softDelete: false })
    //         if (user) {
    //             if (user.activationCode !== req.body.activationCode) { return resBuilder.invalidReq(res, "", " شماره موبایل یا کد ارسالی اشتباه است") }
    //             if (!user.active) { return resBuilder.notFound(res, 'کاربر در سیستم غیر فعال شده است لطفا با پشتیبانی تماس بگیرید') }
    //             await User.findByIdAndUpdate(user.id, { activationCode: "" });
    //             await redisHandler.put(user.id, cryptography.base64.encode(JSON.stringify({ user: user })))
    //             await recordActivity(user.id, "/auth/userEntrance", req.body);
    //             return resBuilder.success(res, {
    //                 token: generateAccessToken({ username: user.id }), name: user.name, username: user.username, role: user.role
    //             }, "")
    //         } else { return resBuilder.notFound(res, 'کاربری با این شماره موبایل در سبستم وجود ندارد') }
    //     } catch (err) {
    //         console.log(err)
    //         return resBuilder.internalFa(res)
    //     }
    // },

    // //send activationCode for login with activationCode or reset password
    // userGetActivationCode: async (req, res) => {
    //     try {
    //         const user = await Model.User.findOne({ mobile: req.body.mobile, role: "user", softDelete: false })
    //         if (user) {
    //             if (!user.active) { return resBuilder.notFound(res, 'کاربر در سیستم غیر فعال شده است لطفا با پشتیبانی تماس بگیرید') }
    //             await User.findByIdAndUpdate(user.id, { activationCode: Math.floor(Math.random() * 89999 + 10000) });
    //             await recordActivity(user.id, "/auth/userResetPasswordActivationCode", req.body);
    //             // let smsPromise = await smsAuth('taleghan', req.body.mobile, activationCode)
    //             return resBuilder.success(res, "", ' کد بازیابی برای شما از طریق پیامک ارسال گردید.')
    //         } else { return resBuilder.notFound(res, 'کاربر فعالی با این شماره موبایل وجود ندارد') }
    //     } catch (err) {
    //         console.log(err)
    //         return resBuilder.internalFa(res)
    //     }
    // },

    // userResetPassword: async (req, res) => {
    //     try {
    //         const user = await Model.User.findOne({ mobile: req.body.mobile, role: "user", softDelete: false })
    //         if (!user) { return resBuilder.notFound('کاربری با این شماره موبایل وجود ندارد') }
    //         if (!user.active) { return resBuilder.notFound(res, 'کاربر در سیستم غیر فعال شده است لطفا با پشتیبانی تماس بگیرید') }
    //         if (user.activationCode != req.body.activationCode) { return resBuilder.invalidReq(res, '', 'کد بازیابی رمز عبور اشتباه است') }
    //         await User.findByIdAndUpdate(user.id, { password: cryptography.md5(req.body.password), activationCode: "" })
    //         await recordActivity(user.id, "/auth/userResetPassword", req.body);
    //         return resBuilder.success(res, "", 'رمز عبور با موفقیت ویرایش گردید')
    //     } catch (err) {
    //         console.log(err)
    //         return resBuilder.internalFa(res)
    //     }
    // }

}
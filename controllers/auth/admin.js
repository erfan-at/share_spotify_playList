const { generateAccessToken } = require("../../functions/functions");
var { recordActivity } = require("../../functions/functions");
const md5 = require('md5')
const User = require("../../models/user.model")



module.exports = {
    adminLogin: async (req, res, next) => {
        try {
            const user = await User.find({ softDelete: false, mobile: req.body.mobile, password: md5(req.body.password) })
            if (user.length != 1) {
                console.log("we have more than 1 user with this phone number")
                return res.status(500).send("مشکلی پیش آمده است با پشتیبانی تماس بگیرید")
            }
            if (user[0].active == false) { return res.status(404).send("کاربر در سامانه غیر فعال است") }
            let recordActivityPromise = recordActivity(user[0].id, "/auth/adminLogin", req.body);
            recordActivityPromise.then(resultActivity => {
                if (resultActivity.code = 201) {
                    console.log(resultActivity);
                    return res.status(200).send(new Object({
                        token: generateAccessToken({
                            userId: (user[0].id)
                        }),
                        username: user[0].username, role: user[0].role
                    }))
                } else { return res.status(resultActivity.code).send(resultActivity.text) }
            }).catch((errorActivity) => {
                console.log({ errorActivity });
            });
        } catch (err) {
            console.log(err)
            return res.status(404).send("کاربر در سامانه وجود ندارد")
        }
    },

    adminResetPasswordGetActivationCode: async (req, res, next) => {
        try {
            const user = await User.find({ softDelete: false, mobile: req.body.mobile })
            if (user.length != 1) {
                console.log("we have more than 1 user with this phone number")
                return res.status(500).send("مشکلی پیش آمده است با پشتیبانی تماس بگیرید")
            }
            if (user[0].active == false) { return res.status(404).send("کاربر غیر فعال است") }
            const activationCode = Math.floor(Math.random() * 89999 + 10000)
            const userId = user[0].id
            const updatedUser = await User.findByIdAndUpdate({ _id: userId }, { activationCode: activationCode })
            console.log(updatedUser.id)
            let recordActivityPromise = recordActivity(user[0].id, "/auth/adminLogin", req.body);
            recordActivityPromise.then(resultActivity => {
                if (resultActivity.code = 201) {
                    console.log(resultActivity);
                    // let smsPromise = smsAuth('taleghan', req.body.mobile, activationKey)
                    // smsPromise.then(result => {
                    return res.status(200).send('کد بازیابی برای شما از طریق پیامک ارسال گردید.')
                    // }).catch(error => {
                    //     console.log(error)
                    // })
                } else { return res.status(resultActivity.code).send(resultActivity.text) }
            }).catch((errorActivity) => {
                console.log({ errorActivity });
            });
        } catch (err) {
            console.log(err)
            return res.status(404).send("کاربر در سامانه وجود ندارد")
        }
    },

    adminResetPassword: async (req, res, next) => {
        try {
            const user = await User.find({ softDelete: false, mobile: req.body.mobile })
            if (user.length != 1) {
                console.log("we have more than 1 user with this phone number")
                return res.status(500).send("مشکلی پیش آمده است با پشتیبانی تماس بگیرید")
            }
            if (user[0].active == false) { return res.status(404).send("کاربر در سامانه غیر فعال است") }
            if (user[0].activationCode !== parseInt(req.body.activationCode)) { return res.status(403).send("کد یکبار مصرف اشتباه است") }
            const userId = user[0].id
            const deleteUserActivationCode = await User.findByIdAndUpdate({ _id: userId }, { "password": md5(req.body.password), "activationCode": "" }, { new: true })
            console.log(deleteUserActivationCode)
            return res.status(200).send("رمز عبور با موفقیت تغییر کرد")
        } catch (err) {
            console.log(err)
            return res.status(404).send("مشکلی پیش آمده است با پشتسبانی تماس بگیرید")
        }
    }
}
const { recordActivity, generateAccessToken } = require('../../functions/functions')
const User = require('../../models/user.model')
const md5 = require('md5')
const resBuilder = require('../../functions/responseBuilder')
module.exports = {

    userSignup: async (req, res, next) => {
        try {
            let user = await User.findOne({ mobile: req.body.mobile, softDelete: false })
            if (user) { return resBuilder.conflict(res, "", ' کاربری با این شماره موبایل در سیستم وجود دارد ') }
            user = new User({
                name: req.body.name, mobile: req.body.mobile, password: md5(req.body.password),
                username: req.body.username, role: "user"
            })
            await user.save();
            await recordActivity(user.id, "/auth/userSignup", req.body);
            return resBuilder.success(res, {
                token: generateAccessToken({ username: user.id }),
                name: user.name,
                username: user.username,
                role: user.role
            }, "حساب کاربری شما با موفقیت ایجاد شد")
        } catch (err) {
            console.log(err)
            return resBuilder.internal(res)
        }
    },

    userEntrance: async (req, res, next) => { },

    userLogin: asyncHandler(async (req, res, next) => {
        try { } catch (err) { }

        //check with database:
        if (resp.data.results == 1) {
            var user = resp.data.users[0];
            if (user.password == md5(req.body.password)) {
                let recordActivityPromise = recordActivity(
                    user._id,
                    "manageContact/auth/login",
                    req.body
                );
                recordActivityPromise
                    .then((resultActivity) => {
                        if (resultActivity.code != 201)
                            console.log(resultActivity);
                    })
                    .catch((errorActivity) => {
                        console.log({ errorActivity });
                    });
                res.status(200).send(
                    new Object({
                        token: generateAccessToken(
                            { username: user._id },
                            req.dbSaltToken
                        ),
                        name: user.name,
                        role: user.role
                    })
                );
            } else res.status(403).send("پسورد اشتباه است !");
        } else if (resp.data.results == 0) {
            res.status(404).send(
                "کاربری با چنین شماره موبایل و پسوردی در سامانه وجود ندارد."
            );
        } else {
            res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.")
        };

    }),

    userResetPasswordActivationCode: async (req, res, next) => { },

    userResetPassword: async (req, res, next) => { }
}
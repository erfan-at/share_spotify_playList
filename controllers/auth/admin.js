const axios = require("axios");
const asyncHandler = require("express-async-handler");
const config = require("../../config");
const generateAccessToken = require("../../config/generateToken");
var { recordActivity } = require("../../functions/functions");
var { smsAuth } = require('../../notification/notification-manager');
const moment = require("jalali-moment");
const md5 = require('md5')
module.exports = {

    adminLogin: asyncHandler(async (req, res, next) => {
        console.log(req.body)
        axios.get(config.manageContactHostUser + "?softDelete=false&active=true&role=admin&mobile=" + req.body.mobile).then(resp => {
            if (resp.data.status == "success") {
                console.log(resp.data)
                if (resp.data.results == 1) {
                    if (resp.data.users[0].password == md5(req.body.password)) {
                        let recordActivityPromise = recordActivity(resp.data.users[0]._id, 'manageContact/auth/adminLogin', req.body)
                        recordActivityPromise.then(resultActivity => {
                            if (resultActivity.code == 201) {
                                res.status(200).send(new Object({
                                    token: generateAccessToken({
                                        username: resp.data.users[0]._id
                                    }),
                                    name: resp.data.users[0].name,
                                    role: resp.data.users[0].role
                                }))
                            } else { res.status(resultActivity.code).send(resultActivity.text) }

                        }).catch(errorActivity => {
                            res.status(409).send('خطایی رخ داده است، دوباره اقدام نمایید')
                            console.log({ errorActivity })
                        })
                    } else res.status(403).send('رمز عبور وارد شده اشتباه است')
                } else if (resp.data.results == 0) { res.status(404).send('کاربر ادمین وجود ندارد') }
                else {
                    console.log(error)
                    res.status(500).send(('مشکلی پیش آمده است با پشتیبانی تماس بگیرید'))
                }
            } else {
                console.log(error)
                res.status(500).send('مشکلی پیش آمده است با پشتیبانی تماس بگیرید')
            }
        }).catch(error => {
            console.log(error)
            res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.")
        })
    }),

    adminResetPasswordActivationCode: asyncHandler(async (req, res, next) => {
        axios.get(config.manageContactHostUser + "?softDelete=false&active=true&role=admin&mobile=" + req.body.mobile).then(resp => {
            if (resp.data.status == "success") {
                if (resp.data.results == 1) {
                    var activationCode = Math.floor(Math.random() * 89999 + 10000)
                    axios.patch(config.manageContactHostUser + "/" + resp.data.users[0]._id, {
                        "activationCode": activationCode
                    }).then(resp1 => {
                        if (resp1.data.status == "success") {
                            let recordActivityPromise = recordActivity(resp.data.users[0]._id,
                                'manageContact/auth/adminResetPasswordActivationCode', req.body)
                            recordActivityPromise.then(resultActivity => {
                                if (resultActivity.code == 201) {
                                    let smsPromise = smsAuth('taleghan', req.body.mobile, activationCode)
                                    smsPromise.then(result => {
                                        res.status(200).send('کد بازیابی برای شما از طریق پیامک ارسال گردید.')
                                    }).catch(error => {
                                        console.log(error)
                                    })
                                } else { res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.") };
                            }).catch(errorActivity => {
                                console.log(error)
                                res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.")
                            });
                        } else { res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.") };
                    }).catch(error => {
                        console.log(error)
                        res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.");
                    });
                } else if (resp.data.results == 0) {
                    res.status(404).send('کاربر فعالی با این شماره موبایل وجود ندارد')
                } else { res.status(400).send('مشکلی پیش آمده است با پشتیبانی تماس بگیرید') }

            } else { res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.") };
        }).catch(error => {
            console.log(error)
            res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.")
        });
    }),

    adminResetPassword: asyncHandler(async (req, res, next) => {
        axios.get(config.manageContactHostUser + "?softDelete=false&active=true&role=admin&mobile=" + req.body.mobile).then(resp => {
            if (resp.data.status == "success") {
                if (resp.data.results == 1) {
                    if (req.body.activationCode == resp.data.users[0].activationCode) {
                        axios.patch(config.manageContactHostUser + "/" + resp.data.users[0]._id, {
                            "password": md5(req.body.password),
                            "activationCode": ''
                        }).then(resp1 => {
                            if (resp.data.status == "success") {
                                let recordActivityPromise = recordActivity(resp.data.users[0]._id,
                                    'manageContact/auth/adminResetPassword', req.body)
                                recordActivityPromise.then(resultActivity => {
                                    if (resultActivity.code == 201) {
                                        res.status(200).send('رمز عبور با موفقیت ویرایش گردید')
                                    } else { res.status(resultActivity.code).send(resultActivity.text) }
                                }).catch(errorActivity => {
                                    res.status(409).send('خطایی رخ داده است، دوباره اقدام نمایید')
                                    console.log({ errorActivity })
                                })
                            } else { res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.") }
                        }).catch(error => {
                            console.log(error)
                            res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.")
                        })
                    } else res.status(403).send('کد بازیابی رمز عبور اشتباه است')
                } else if (resp.data.results == 0) { res.status(404).send('کاربری با این شماره تلفن همراه وجود ندارد') }
                else { res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.") }
            } else { res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.") }
        }).catch(error => {
            console.log(error)
            res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.")
        })
    })
}
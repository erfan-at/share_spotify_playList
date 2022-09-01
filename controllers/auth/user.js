const axios = require("axios");
const asyncHandler = require("express-async-handler");
const config = require("../../config");
const generateAccessToken = require("../../config/generateToken");
var { recordActivity } = require("../../functions/functions");
var { smsAuth } = require('../../notification/notification-manager');
const moment = require("jalali-moment");
var md5 = require("md5");
module.exports = {

    userSignup: asyncHandler(async (req, res, next) => {
        axios.get(config.manageContactHostUser +
            "?fields=password,name,role&softDelete=false&active=true&mobile=" +
            req.body.mobile + "&password=" + md5(req.body.password)).then(resp => {
                if (resp.data.status == "success") {
                    if (resp.data.results == 1) {
                        res.status(500).send("کاربری با این مشخصات در سیستم وجود دارد")
                    } else if (resp.data.results == 0) {
                        var activationCode = Math.floor(Math.random() * 89999 + 10000)
                        var registerDate = moment(new Date()).format("X")
                        axios.post(config.manageContactHostUser, {
                            "name": req.body.name,
                            "mobile": req.body.mobile,
                            "password": md5(req.body.password),
                            "activationCode": activationCode,
                            "role": "user",
                            "registerDate": registerDate,
                            "softDelete": false,
                            "active": true
                        }).then(resp1 => {
                            if (resp1.data.status == "success") {
                                let recordActivityPromise = recordActivity(
                                    resp1.data._id,
                                    "manageContact/auth/login",
                                    req.body
                                );
                                recordActivityPromise
                                    .then(resultActivity => {
                                        if (resultActivity.code = 201) {
                                            console.log(resultActivity);
                                            let smsPromise = smsAuth('taleghan', req.body.mobile, activationCode)
                                            smsPromise.then(result => {
                                                if (result.code == 200) {
                                                    console.log(result)
                                                    res.status(201).send('شما با موفقیت در سامانه عضو شدید. کد فعالسازی برای شما از طریق پیامک ارسال گردید.')
                                                } else { res.status(result.code).send(result.text) }
                                            }).catch(error => {
                                                console.log(error)
                                            })
                                        } else { res.status(resultActivity.code).send(resultActivity.text) }
                                    })
                                    .catch((errorActivity) => {
                                        console.log({ errorActivity });
                                    });
                            } else {
                                console.log(resp1)
                                res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.");
                            }
                        }).catch(error => {
                            console.log(error)
                            res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.");
                        })
                    } else { res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.") }
                } else { res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.") }
            }).catch(error => {
                console.log(error);
                res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.");
            });
    }),

    userEntrance: asyncHandler(async (req, res, next) => {
        axios.get(config.manageContactHostUser + "?softDelete=false&active=true&role=user&mobile=" + req.body.mobile)
            .then(resp => {
                if (resp.data.status == "success") {
                    if (resp.data.results == 1) {
                        if (resp.data.users[0].activationCode == req.body.activationCode) {
                            axios.patch(config.manageContactHostUser + "/" + resp.data.users[0]._id, {
                                "activationCode": ""
                            }).then(resp1 => {
                                if (resp1.data.status == "success") {
                                    let recordActivityPromise = recordActivity(
                                        resp1.data._id,
                                        "manageContact/auth/entrance",
                                        req.body
                                    );
                                    recordActivityPromise
                                        .then(resultActivity => {
                                            if (resultActivity.code = 201) {
                                                console.log(resultActivity);
                                                res.status(200).send(new Object({
                                                    token: generateAccessToken({
                                                        username: resp.data.users[0]._id
                                                    }),
                                                    name: resp.data.users[0].name,
                                                    role: resp.data.users[0].role
                                                }))
                                            } else { res.status(resultActivity.code).send(resultActivity.text) }
                                        }).catch((errorActivity) => {
                                            console.log({ errorActivity });
                                        });
                                } else {
                                    console.log(resp1)
                                    res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.");
                                }
                            }).catch(error => {
                                console.log(error)
                                res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.");
                            })
                        } else { res.status(500).send("کد فعالسازی اشتباه است") }
                    } else if (resp.data.results == 0) {
                        res.status(404).send("کاربری با این شماره موبایل در سیستم وجود ندارد")
                    } else { res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.") }
                } else { res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.") }
            }).catch(error => {
                console.log(error)
                res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.");
            })
    }),

    userLogin: asyncHandler(async (req, res, next) => {
        axios.get(config.manageContactHostUser +
            "?fields=password,name,role&softDelete=false&active=true&role=user&mobile=" +
            req.body.mobile).then(function (resp) {
                if (resp.data.status == "success") {
                    console.log(resp.data)
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
                } else {
                    console.log(response)
                    res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.")
                }
            }).catch(function (error) {
                console.log(error);
                res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید.");
            });
    }),

    userResetPasswordActivationCode: asyncHandler(async (req, res, next) => {
        axios.get(config.manageContactHostUser + "?softDelete=false&active=true&role=user&mobile=" + req.body.mobile).then(resp => {
            if (resp.data.status == "success") {
                if (resp.data.results == 1) {
                    var activationCode = Math.floor(Math.random() * 89999 + 10000)
                    axios.patch(config.manageContactHostUser + "/" + resp.data.users[0]._id, {
                        "activationCode": activationCode
                    }).then(resp1 => {
                        if (resp1.data.status == "success") {
                            let recordActivityPromise = recordActivity(resp.data.users[0]._id,
                                'manageContact/auth/userResetPasswordActivationCode', req.body)
                            recordActivityPromise.then(resultActivity => {
                                if (resultActivity.code == 201) {
                                    // let smsPromise = smsAuth('taleghan', req.body.mobile, activationCode)
                                    // smsPromise.then(result => {
                                    res.status(200).send('کد بازیابی برای شما از طریق پیامک ارسال گردید.')
                                    // }).catch(error => {
                                    //     console.log(error)
                                    // })
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

    userResetPassword: asyncHandler(async (req, res, next) => {
        axios.get(config.manageContactHostUser + "?softDelete=false&active=true&role=user&mobile=" + req.body.mobile).then(resp => {
            if (resp.data.status == "success") {
                if (resp.data.results == 1) {
                    if (req.body.activationCode == resp.data.users[0].activationCode) {
                        axios.patch(config.manageContactHostUser + "/" + resp.data.users[0]._id, {
                            "password": md5(req.body.password),
                            "activationCode": ''
                        }).then(resp1 => {
                            if (resp.data.status == "success") {
                                let recordActivityPromise = recordActivity(resp.data.users[0]._id,
                                    'manageContact/auth/userResetPassword', req.body)
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
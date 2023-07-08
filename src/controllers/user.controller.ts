import responseBuilder from '../library/responseBuilder'
import Joi from 'joi'
import Schema from '../validation'
import Service from '../service/index'
import chalk from 'chalk';

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         let createDirectionPromise = createDirection(req.userRole, "avatar", req.userData._id)
//         createDirectionPromise.then(resultDirection => {
//             if (resultDirection.code == 200) {
//                 var final = resultDirection.final
//                 // return
//                 if (fs.existsSync(final)) {
//                     cb(null, final);
//                 }
//                 else {
//                     fs.mkdir(final, { recursive: true }, (err) => {
//                         if (err) throw err;
//                         cb(null, final);
//                     });
//                 }
//                 console.log('final:' + final)
//                 return
//             } else cb(new Error({ code: 409, message: 'اشکالی در فرآیند بارگذاری بوجود آمده است' }))
//         }).catch(errorDirection => {
//             console.log({ errorDirection })
//             cb(new Error({ code: 403, message: 'خطایی رخ داده است دوباره تلاش نمایید' }))
//         })
//     },
//     filename: (req, file, cb) => {
//         cb(null, String(new Date().getTime()) + file.originalname.replace(/\s/g, ''));
//     }
// });

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 5242880 },
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "application/octet-stream") {
//             var fileType = file.originalname.split(".").pop()
//             if ((fileType == "doc" || fileType == "docx")) {
//                 cb(null, true);
//             } else {
//                 cb(null, false);
//                 return cb(new Error({ code: 412, message: 'فرمت فایل بارگذاری مجاز نمی‌باشد(عکس،)' }));
//             }
//         } else {
//             if ((file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"
//                 || file.mimetype == "application/pdf" || file.mimetype == "application/msword"
//                 || file.mimetype == "audio/mp3" || file.mimetype == "audio/mpeg"
//                 || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessin"
//                 || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
//                 cb(null, true);
//             } else {
//                 cb(null, false);
//                 return cb({ code: 412, message: 'فرمت فایل بارگذاری مجاز نمی‌باشد(عکس،)' });
//             }
//         }
//     }
// }).any()

export default {

    get: async (req: any, res: any) => {
        try {
            const userData = await Service.CRUD.findOneRecord('User', req.userData._id, [])
            return responseBuilder.success(res, userData, "")
        } catch (err) {
            console.log(chalk.underline.red("✖ err from catch of controller : "))
            console.log(chalk.red(err))
            console.log(chalk.underline.red("✖ err from catch of controller : "))
            return responseBuilder.internalErr(res)
        }
    },

    edit: async (req: any, res: any) => {
        const result = Schema.userProfieValidation.editSchema.validate(req.body)
        if (result.error) { return responseBuilder.badRequest(res, req.body, result.error.message) }
        try {
            const data = await Joi.attempt(result.value, Schema.userProfieValidation.editSchema)
            const updatedUserData = await Service.CRUD.updateById('User', data, req.userData._id, [], "",)
            return responseBuilder.success(res, updatedUserData, "ویرایش اطلاعات پروفایل با موفقیت انجام شد.")
        } catch (err) {
            console.log(chalk.underline.red("✖ err from catch of controller : "))
            console.log(chalk.red(err))
            console.log(chalk.underline.red("✖ err from catch of controller : "))
            return responseBuilder.internalErr(res)
        }
    },

    // addAvatar: async (req, res, next) => {

    //     upload(req, res, (err1) => {
    //         if (err1) {
    //             if (err1.message == 'File too large') res.status(412).send('لطفا از فایل با حجم کمتر از پنج مگ استفاده نمایید')
    //             else res.status(err1.code).send(err1.message)
    //         } else { return next() }
    //     })
    // }, async(req, res) {
    //     try {
    //         console.log("-*/-*/-*/-*/-*/-*/-*/-*/-*/")
    //         console.log(req.file)
    //         console.log("-*/-*/-*/-*/-*/-*/-*/-*/-*/")

    //         var file = req.files.map(x => {
    //             return {
    //                 name: x.filename,
    //                 size: x.size,
    //                 type: x.mimetype,
    //                 showName: x.filename.slice(13),
    //                 rawUrl: createRawUrl(req.userRole, "avatar", req.userData._id, req.userData._id, x.filename),
    //                 status: "avatar",
    //                 url: appConfig.CDNPrivate + createRawUrl(req.userRole, "avatar", req.userData._id, req.userData._id, x.filename),
    //             }
    //         })[0]
    //         let createFileUploadPromise = createFileUpload(file)
    //         if (createFileUploadPromise.code == 201) {
    //             Model.user.findByIdAndUpdate(req.id, { avatarId: createFileUploadPromise.id })
    //             res.status(200).send(new Object({
    //                 "avatarUrl": appConfig.CDNPrivate + createRawUrl(req.userRole, "avatar", req.userData._id, req.userData._id, file.name),
    //                 "text": "عکس شما با موفقیت آپلود شد"
    //             }))
    //         } else res.status(createFileUploadPromise.code).send(createFileUploadPromise.text)

    //     } catch (err) {
    //         console.log(err)

    //     }
    // },

    getOtherUserProfile: async (req: any, res: any) => { },

    getOtherUserFollowers: async (req: any, res: any) => { },

    getOtherUserFollowings: async (req: any, res: any) => { },

    followers: async () => {
        // try {
        //     let userData = await Model.User.findById(req.userData._id)
        //         .select({ softDelete: 0, updatedAt: 0, active: 0, password: 0, role: 0 })
        //         .lean()
        //     userData.createdAt = moment(userData.createdAt, "X").format("jYYYY/jMM/jDD HH:mm")
        //     return responseBuilder.success(res, userData, "")
        // } catch (err) {
        //     console.log(err)
        //     return responseBuilder.internalFa(res)
        // }
    },

    followings: async () => {
        // try {
        //     let userData = await Model.User.findById(req.userData._id)
        //         .select({ softDelete: 0, updatedAt: 0, active: 0, password: 0, role: 0 })
        //         .lean()
        //     userData.createdAt = moment(userData.createdAt, "X").format("jYYYY/jMM/jDD HH:mm")
        //     return responseBuilder.success(res, userData, "")
        // } catch (err) {
        //     console.log(err)
        //     return responseBuilder.internalFa(res)
        // }
    },

    follow: async () => {
        // try {
        //     const result = await Schema.editSchema.validate(req.body)
        //     if (result.error) { return responseBuilder.invalidReq(res, req.body, result.error.message) }
        //     const data = await Joi.attempt(result.value, Schema.editSchema)
        //     //-----
        //     const updatedUserData = await Model.User.findByIdAndUpdate(req.userData._id, data, { new: true })
        //     return responseBuilder.success(res, updatedUserData, "ویرایش اطلاعات پروفایل با موفقیت انجام شد.")
        // } catch (e) {
        //     console.log(e)
        //     return res.status(500).send("مشکلی پیش آمده است با پشتیبانی تماس بگیرید.")
        // }
    },
    // try {
    //     let userData = await Model.User.findById(req.userData._id)
    //         .select({ softDelete: 0, updatedAt: 0, active: 0, password: 0, role: 0 })
    //         .lean()
    //     userData.createdAt = moment(userData.createdAt, "X").format("jYYYY/jMM/jDD HH:mm")
    //     return responseBuilder.success(res, userData, "")
    // } catch (err) {
    //     console.log(err)
    //     return responseBuilder.internalFa(res)
    // }
    unFollow: async () => {
        // try {
        //     const result = await Schema.editSchema.validate(req.body)
        //     if (result.error) { return responseBuilder.invalidReq(res, req.body, result.error.message) }
        //     const data = await Joi.attempt(result.value, Schema.editSchema)
        //     //-----
        //     const updatedUserData = await Model.User.findByIdAndUpdate(req.userData._id, data, { new: true })
        //     return responseBuilder.success(res, updatedUserData, "ویرایش اطلاعات پروفایل با موفقیت انجام شد.")
        // } catch (e) {
        //     console.log(e)
        //     return res.status(500).send("مشکلی پیش آمده است با پشتیبانی تماس بگیرید.")
        // }
    },
}

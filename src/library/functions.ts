import Model from "./../models/index"
import jwt from "jsonwebtoken"
import appConfig from "../config/application"
export default {
    recordActivity: async (userId: string, endPoint: string, body: string) => {
        try {
            return await Model.Activity.create({
                "userId": userId,
                "endPoint": endPoint ? endPoint : '',
                "body": body ? JSON.stringify(body) : '',
                "softDelete": false
            })
        } catch (err) { console.log(err) }
    },

    checkUserExist: async (req: any, res: any, next: any) => {
        try {
            const user = await Model.User.findById(req.userId);
            req.adminData = user
            next()
            // } else { return res.status(404).send('کاربر غیر فعال است') }

            // } else { return res.status(404).send('کاربر ادمین وجود ندارد') }
        } catch (error) {
            console.log(error);
            return res.status(404).send('کاربر ادمین در سامانه وجود ندارد')
        }
    },


    checkAdminExist: async (req: any, res: any, next: any) => {
        try {
            if (req.adminData.softDelete == false) {
                // if (req.adminData.active == true) {
                if (req.adminData.role == "admin") {
                    return next()
                } else { return res.status(403).send("کاربر ادمین دسترسی محتوا ندارد") }
                // } else { return res.status(404).send('کاربر غیر فعال است') }
            } else { return res.status(404).send('کاربر ادمین وجود ندارد') }
        } catch (error) {
            console.log(error);
            return res.status(404).send('کاربر ادمین در سامانه وجود ندارد')
        }
    },

    authenticateToken: (req: any, res: any, next: any) => {
        // Gather the jwt access token from the request header
        const authHeader = req.headers['authorization']
        const token = authHeader.split(' ')[0]
        if (token == null) return res.sendStatus(401) // if there isn't any token
        // console.log('token', res.locals.TOKEN_SECRET)
        jwt.verify(token, appConfig.jwt.secret, (err: any, data: any) => {
            if (err) console.log(err)
            console.log(new Date())
            if (err) return res.status(403).send('نشست شما در سامانه منقضی شده است، لطفا مجددا به سامانه ورود نمایید.')
            req.userId = data.username
            return next() // pass the execution off to whatever request the client intended
        })
    },

    recordActivityMid: async (req: any, res: any, next: any) => {
        try {
            const data = {
                userId: req.userId,
                body: JSON.stringify(req.body),
                endPoint: req.originalUrl
            }
            const newActivity = new Model.Activity(data)
            await newActivity.save()
            return next()
        } catch (error) {
            console.log("error for save a record activity middle == > : ", error)
            return res.status(409).send('خطایی رخ داده است لطفا دوباره اقدام نمایید')
        }
    }
}
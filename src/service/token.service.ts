// import jwt from "jsonwebtoken"
// import Activity from "../models/activity.model"
// import Model from '../models/index'
// import appConfig from '../config/application'
// export default  {

//     generateAccessToken: async (username) => {
//         return await jwt.sign(username, TOKEN_SECRET, { expiresIn: '100d' });
//     },


//     authenticateToken: function (req, res, next) {
//         // Gather the jwt access token from the request header
//         const authHeader = req.headers['authorization']
//         const token = authHeader && authHeader.split(' ')[1]
//         if (token == null) return res.sendStatus(401) // if there isn't any token
//         // console.log('token', res.locals.TOKEN_SECRET)
//         jwt.verify(token, appConfig.salt, (err, userId) => {
//             if (err) console.log(err)
//             console.log(new Date())
//             if (err) return res.status(403).send('نشست شما در سامانه منقضی شده است، لطفا مجددا به سامانه ورود نمایید.')
//             req.userId = userId.username
//             // console.log('req.userId', req.userId)
//             return next() // pass the execution off to whatever request the client intended
//         })
//     },




// }
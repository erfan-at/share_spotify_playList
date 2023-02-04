// import { DEFAULT_ENCODING } from 'crypto'
// import jwt from 'jsonwebtoken'
// import md5 from 'md5'
// // import appConfig  from '../../config/application'
// export default {
//     generateUserJwtToken: function (data) {
//         return jwt.sign({ data }, appConfig.jwt.secret, { expiresIn: appConfig.jwt.expire })
//     },
//     async ecodeUserJwtToken(token) {
//         return jwt.verify(token, appConfig.jwt.secret)
//     },
//     password: {
//         hash: async (password) =>
//             await bcrypt.hash(password.toString(), 12),

//         compare: async (foundPassword, encryptedPassword) =>
//             await bcrypt.compare(foundPassword, encryptedPassword)
//     },
//     base64: {
//         encode: (data) => {
//             let buff = Buffer.from(data)
//             return buff.toString('base64');
//         },
//         decode: (data) => {
//             let buff = Buffer.from(data, 'base64');
//             return buff.toString('utf8');
//         }
//     },
//     md5: (data) => { return md5(data) }
// }
import jwt from 'jsonwebtoken';
import md5 from 'md5';
import appConfig from '../config/application';
export default {
  generateAccessToken(username:any) {
    return jwt.sign(username, appConfig.jwt.secret, { expiresIn: appConfig.jwt.expire });
  },

  verifyJwtToken(token: string) {
    // return jwt.verify(token:string, appConfig.jwt.secret)
    jwt.verify(token, appConfig.jwt.secret, (err: any, data: any) => {
      console.log(new Date());
      if (!err) {
        return data.username.toString();
      }
      // } else {
      //     return { status: "success", username: data.username }
      // }
    });
  },
  password: {
    hash: async (password: number | string) => await md5(password),
  },
  base64: {
    encode: (data: string) => {
      let buff = Buffer.from(data);
      return buff.toString('base64');
    },
    decode: (data: string) => {
      let buff = Buffer.from(data, 'base64');
      return buff.toString('utf8');
    },
  },
  md5: (data: string | number) => {
    return md5(data);
  },
};

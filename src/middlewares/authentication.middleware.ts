import Service from '../service/index';
import resBuilder from '../library/responseBuilder';
import jwt from 'jsonwebtoken';
import appConfig from '../config/application';
const ignoredPath = [
  'POST /api/v1/auth/signup',
  'POST /api/v1/auth/login',
  'POST /api/v1/auth/entrance',
  'POST /api/v1/auth/resetPassword',
  'POST /api/v1/auth/ sendActivationCode',
];

export default {
  authenticateToken: async (req: any, res: any, next: any) => {
    if (ignoredPath.includes(`${req.method} ${req.originalUrl}`)) {
      return next();
    }
    console.log(new Date());
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[0];
    if (token == null) {
      resBuilder.unauthorized(res, '');
    }
    let username: string = '';
    jwt.verify(token, appConfig.jwt.secret, (err: any, data: any) => {
      if (err) {
        console.log(err);
        return resBuilder.forbidden(res, '', 'نشست شما در سامانه منقضی شده است، لطفا مجددا به سامانه ورود نمایید.');
      }
      username = data.username;
    });
    try {
      const tokenData = await Service.REDIS.get(username);
      if (tokenData) {
        req.userData = JSON.parse(Service.CRYPTOGRAPHY.base64.decode(tokenData));
      } else {
        const userData = await Service.CRUD.findById('User', username, []);
        await Service.REDIS.put(username, Service.CRYPTOGRAPHY.base64.encode(JSON.stringify(userData)));
        req.userData = userData;
      }
      return next();
    } catch (err) {
      console.log(err);
      return resBuilder.unauthorized(res, '');
    }
  },
};

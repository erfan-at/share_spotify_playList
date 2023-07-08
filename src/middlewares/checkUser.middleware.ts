import Model from './../models/index';
import responseBuilder from './../library/responseBuilder';
import { Response, NextFunction } from 'express';
import chalk from 'chalk';
export default {
  checkAdminExist: async (req: any, res: Response, next: NextFunction) => {
    try {
      if (req.adminData.softDelete == false) {
        if (req.adminData.role == 'admin') {
          return next();
        } else {
          return responseBuilder.forbidden(res, '', 'کاربر ادمین دسترسی محتوا ندارد');
        }
        // } else { return res.status(404).send('کاربر غیر فعال است') }
      } else {
        return responseBuilder.notFound(res, '', 'کاربر ادمین وجود ندارد');
      }
    } catch (err) {
      console.log(chalk.underline.red('✖ err from catch of controller : '));
      console.log(chalk.red(err));
      console.log(chalk.underline.red('✖ err from catch of controller : '));
      return responseBuilder.internalErr(res);
    }
  },

  recordActivityMid: async (req: any, res: Response, next: NextFunction) => {
    try {
      const data = {
        userId: req.userData._id,
        body: JSON.stringify(req.body),
        endPoint: req.originalUrl,
      };
      const newActivity = new Model.Activity(data);
      await newActivity.save();
      return next();
    } catch (error) {
      console.log('error for save a record activity middle == > : ', error);
      return responseBuilder.conflict(res, '', "خطایی رخ داده است لطفا دوباره اقدام نمایید'");
    }
  },
};

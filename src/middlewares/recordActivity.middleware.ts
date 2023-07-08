import Model from './../models/index';
import jwt from 'jsonwebtoken';
import appConfig from '../config/application';
import chalk from 'chalk';
import responseBuilder from '../library/responseBuilder';
export default async (req: any, res: any, next: any) => {
  try {
    const data = {
      userId: req.userData._id,
      body: JSON.stringify(req.body),
      endPoint: req.originalUrl,
    };
    const newActivity = new Model.Activity(data);
    await newActivity.save();
    return next();
  } catch (err) {
    console.log(chalk.underline.red('✖ err from catch of controller : '));
    console.log(chalk.red(err));
    console.log(chalk.underline.red('✖ err from catch of controller : '));
    return responseBuilder.internalErr(res);
  }
};

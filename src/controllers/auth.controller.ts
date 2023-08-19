import functions from '../library/functions';
import Service from '../service/index';
import Model from '../models/index';
import responseBuilder from '../library/responseBuilder';
import CRYPTOGRAPHY from './../library/cryptography';
import chalk from 'chalk';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Schema from '../validation/index';
import Joi from 'joi';

export default {
	
  createData: async (req: Request, res: Response) => {
    // if (result.error) { return responseBuilder.badRequest(res, req.body, result.error.message) }
    try {
      // const data = await Joi.attempt(result.value, Schema.playListValidation.createSchema)
      const user = await Model.User.create({
        firstName: 'erfan',
        lastName: 'afsdf',
        uuid: 34534534534534,
        username: 'erfuuan',
        mobile: '09305087411',
        email: 'erfan.at799@gmail.com',
        password: CRYPTOGRAPHY.md5('12345678'),
        gender: 'male',
        role: 'admin',
      });
      res.status(201).send(user);
    } catch (err) {
      console.log(chalk.underline.red('✖ err from catch of controller : '));
      console.log(chalk.red(err));
      console.log(chalk.underline.red('✖ err from catch of controller : '));
      return responseBuilder.internalErr(res);
    }
  },

  Signup: async (req: Request, res: Response) => {
    const result = Schema.auth.signup.validate(req.body);
    if (result.error) {
      return responseBuilder.badRequest(res, req.body, result.error.message);
    }
    try {
      const data = await Joi.attempt(result.value, Schema.auth.signup);
      const userExist = await Service.CRUD.findOneRecord(
        'User',
        {
          // mobile: req.body.mobile,
          email: data.email,
          role: 'user',
          softDelete: false,
        },
        []
      );
      if (userExist) {
        const user = {
          email: userExist.email == data.email ? userExist.email : undefined,
        };
        return responseBuilder.conflict(res, user, '.کاربری با این ایمیل وارده در سیستم وجود دارد ');
      }
      const user = await Service.CRUD.create('User', {
        uuid: uuidv4().replace(/-/g, ''),
        firstName: data.firstName,
        lastName: data.lastName,
        password: CRYPTOGRAPHY.md5(data.password),
        email: data.email,
        // mobile: req.body.mobile,
        // username: req.body.username,
        username: CRYPTOGRAPHY.usernameGenerator(data.firstName, data.lastName),
        role: 'user',
      });
      await functions.recordActivity(user._id, '/auth/userSignup', req.body);
      return responseBuilder.success(
        res,
        {
          token: CRYPTOGRAPHY.generateAccessToken({ username: user._id }),
          name: user.name,
          username: user.username,
          role: user.role,
        },
        'حساب کاربری شما با موفقیت ایجاد شد'
      );
    } catch (err) {
      console.log(chalk.underline.red('✖ err from catch of controller : '));
      console.log(chalk.red(err));
      console.log(chalk.underline.red('✖ err from catch of controller : '));
      return responseBuilder.internalErr(res);
    }
  },

  Login: async (req: Request, res: Response) => {
    const result = Schema.auth.login.validate(req.body);
    if (result.error) {
      return responseBuilder.badRequest(res, req.body, result.error.message);
    }
    try {
      const data = await Joi.attempt(result.value, Schema.auth.login);
      const user = await Service.CRUD.findOneRecord(
        'User',
        {
          email: data?.email,
          // username: data?.username,
          password: await CRYPTOGRAPHY.md5(data.password),
          softDelete: false,
        },
        []
      );
      if (!user) {
        return responseBuilder.notFound(res, '', 'کاربری با این مشخصات در سبستم وجود ندارد');
      }
      if (!user.active) {
        return responseBuilder.notFound(res, '', 'کاربر در سیستم غیر فعال شده است لطفا با پشتیبانی تماس بگیرید');
      }
      await functions.recordActivity(user._id, '/auth/Login', req.body);
      await Service.REDIS.put(user._id, CRYPTOGRAPHY.base64.encode(JSON.stringify(user)));
      const responseData = {
        token: CRYPTOGRAPHY.generateAccessToken({ username: user._id }),
        name: user.name,
        username: user.username,
        role: user.role,
      };
      return responseBuilder.success(res, responseData);
    } catch (err) {
      console.log(chalk.underline.red('✖ err from catch of controller : '));
      console.log(chalk.red(err));
      console.log(chalk.underline.red('✖ err from catch of controller : '));
      return responseBuilder.internalErr(res);
    }
  },

  //login with mibile and activationCode
  Entrance: async (req: Request, res: Response) => {
    const result = Schema.auth.Entrance.validate(req.body);
    if (result.error) {
      return responseBuilder.badRequest(res, req.body, result.error.message);
    }
    try {
      const data = await Joi.attempt(result.value, Schema.auth.Entrance);
      const user = await Service.CRUD.findOneRecord('User', { mobile: data.mobile, softDelete: false }, []);
      if (!user) {
        return responseBuilder.notFound(res, '', 'کاربری با این شماره موبایل در سبستم وجود ندارد');
      }
      if (!user.active) {
        return responseBuilder.notFound(res, '', 'کاربر در سیستم غیر فعال شده است لطفا با پشتیبانی تماس بگیرید');
      }
      const checkActiveCodeExist = await Service.REDIS.get(data.activationCode);
      if (!checkActiveCodeExist) {
        return responseBuilder.unauthorized(res, '', 'کد ارسالی منقضی شده است لطفا مجددا تلاش نمایید.');
      }
      await Service.REDIS.put(user._id, CRYPTOGRAPHY.base64.encode(JSON.stringify({ user: user })));
      await functions.recordActivity(user._id, '/auth/userEntrance', data);
      return responseBuilder.success(res, {
        token: CRYPTOGRAPHY.generateAccessToken({ username: user._id }),
        name: user.name,
        username: user.username,
        role: user.role,
      });
    } catch (err) {
      console.log(chalk.underline.red('✖ err from catch of controller : '));
      console.log(chalk.red(err));
      console.log(chalk.underline.red('✖ err from catch of controller : '));
      return responseBuilder.internalErr(res);
    }
  },

  ResetPassword: async (req: Request, res: Response) => {
    const result = Schema.auth.Entrance.validate(req.body);
    if (result.error) {
      return responseBuilder.badRequest(res, req.body, result.error.message);
    }
    try {
      const data = await Joi.attempt(result.value, Schema.auth.Entrance);
      const user = await Service.CRUD.findOneRecord('User', { mobile: data.mobile, softDelete: false }, []);
      if (!user) {
        return responseBuilder.notFound(res, '', 'کاربری با این شماره موبایل وجود ندارد');
      }
      if (!user.active) {
        return responseBuilder.notFound(res, '', 'کاربر در سیستم غیر فعال شده است لطفا با پشتیبانی تماس بگیرید');
      }
      if (user.activationCode != data.activationCode) {
        return responseBuilder.badRequest(res, '', 'کد بازیابی رمز عبور اشتباه است');
      }
      await Service.CRUD.updateById(
        'User',
        { password: CRYPTOGRAPHY.md5(data.password), activationCode: '' },
        user._id,
        [],
        ''
      );
      await functions.recordActivity(user._id, '/auth/adminResetPassword', data);
      return responseBuilder.success(res, '', 'رمز عبور با موفقیت ویرایش گردید');
    } catch (err) {
      console.log(chalk.underline.red('✖ err from catch of controller : '));
      console.log(chalk.red(err));
      console.log(chalk.underline.red('✖ err from catch of controller : '));
      return responseBuilder.internalErr(res);
    }
  },

  //send activationCode
  sendActivationCode: async (req: Request, res: Response) => {
    const result = Schema.auth.sendActivationCode.validate(req.body);
    if (result.error) {
      return responseBuilder.badRequest(res, req.body, result.error.message);
    }
    try {
      const data = await Joi.attempt(result.value, Schema.auth.sendActivationCode);
      const user = await Service.CRUD.findOneRecord('User', { mobile: data.mobile, role: 'admin', softDelete: false }, []);
      if (!user) {
        return responseBuilder.notFound(res, '', 'کاربر فعالی با این شماره موبایل وجود ندارد');
      }
      if (!user.active) {
        return responseBuilder.notFound(res, '', 'کاربر در سیستم غیر فعال شده است لطفا با پشتیبانی تماس بگیرید');
      }
      const avtiveCode = CRYPTOGRAPHY.activeCodegeneratorMusic();
      await Service.REDIS.put(avtiveCode, user);
      await Service.REDIS.setExpire(avtiveCode, 60 * 10); //10 minute
      console.log({ activeCode: avtiveCode });
      await functions.recordActivity(user._id, '/auth/adminResetPasswordActivationCode', data);
      // let smsPromise = await smsAuth('taleghan', req.body.mobile, activationCode)
      return responseBuilder.success(res, '', ' کد بازیابی برای شما از طریق پیامک ارسال گردید.');
    } catch (err) {
      console.log(chalk.underline.red('✖ err from catch of controller : '));
      console.log(chalk.red(err));
      console.log(chalk.underline.red('✖ err from catch of controller : '));
      return responseBuilder.internalErr(res);
    }
  },
};
import Joi from 'joi';

const signup = Joi.object().keys({
  email: Joi.string().required().trim(),
  password: Joi.string().required().min(8).trim(),
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
});

const login = Joi.object()
  .keys({
    email: Joi.string().trim(),
    username: Joi.string().trim(),
    password: Joi.string().required().min(8).trim(),
  })
  .oxor('email', 'username');

const Entrance = Joi.object().keys({
  email: Joi.string().trim(),
  mobile: Joi.number().required().min(11),
  // .max(11),
  // activationCode: Joi.number().required(),
  activationCode: Joi.string().required()

});

const resetPassword = Joi.object().keys({
  password: Joi.string().required().min(8).trim(),
  mobile: Joi.number().required().min(11),
  // .max(11),
  // activationCode: Joi.number().required()
  activationCode: Joi.string().required()

});

const sendActivationCode = Joi.object().keys({
  mobile: Joi.number().required().min(11)
  // .max(11),
});

export default { signup, login, Entrance, resetPassword, sendActivationCode };

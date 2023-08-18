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
  mobile: Joi.string().required().trim(),
  activationCode: Joi.number().required(),
});

export default { signup, login, Entrance };

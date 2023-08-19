import Joi from 'joi';

const getOne = Joi.object().keys({
  id: Joi.string().required().trim(),
});

const createSchema = Joi.object().keys({
  title: Joi.string().required(),
  content: Joi.string().required(),
  description: Joi.string().required(),
  tags: Joi.array().required(),
});
const editSchema = Joi.object().keys({
  id: Joi.string().required().trim(),
  title: Joi.string(),
  content: Joi.string(),
  description: Joi.string(),
  tags: Joi.array(),
});
export default { editSchema, createSchema, getOne };

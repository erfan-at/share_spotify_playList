const Joi = require('joi')

const createSchema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    description: Joi.string().required(),
    tags: Joi.array().required()

})
const editSchema = Joi.object().keys({
    title: Joi.string(),
    content: Joi.string(),
    description: Joi.string(),
    tags: Joi.array()
})
module.exports = { editSchema, createSchema }
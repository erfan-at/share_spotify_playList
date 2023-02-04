import Joi from 'joi'
const createPostSchema = Joi.object().keys({
    text: Joi.string().required(),
    // postId: Joi.number().required(),
})
const editPostSchema = Joi.object().keys({
    text: Joi.string().required(),
    // postId: Joi.number().required(),

})
const createPlayListSchema = Joi.object().keys({
    text: Joi.string().required(),
    playListId: Joi.number().required(),

})
const editPlayListSchema = Joi.object().keys({
    text: Joi.string().required(),
    playListId: Joi.number().required(),

})

module.exports = { createPostSchema, editPostSchema, createPlayListSchema, editPlayListSchema }
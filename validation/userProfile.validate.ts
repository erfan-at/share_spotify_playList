const Joi = require('joi')

const editSchema = Joi.object().keys({
    name: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    username: Joi.string(),
    mobile: Joi.number(),
    email: Joi.string(),
    gender: Joi.string(),
    telegramChannelShare: Joi.boolean(),
    telegram: Joi.string(),
    twitter: Joi.string(),
    instagram: Joi.string(),
    // darkMode: Boolean
    darkMode: Joi.boolean()

})

module.exports = {
    editSchema
    // edit: async (req, res, next) => {
    //     const result = await edit.validate(req.body)
    //     if (result.error) { return responseBuilder.invalidReq(res, req.body, result.error.message) }
    //     const data = await Joi.attempt(result.value, edit)
    //     req.data = data
    //     return next()

    // }
}
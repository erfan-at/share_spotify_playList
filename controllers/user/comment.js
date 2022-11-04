const Model = require('../../models/index')
const resBilder = require('../../functions/responseBuilder')
const moment = require("jalali-moment");
const Joi = require('joi')
const appConfig = require('../../config/application')
const Schema = require('../../validation/index')

module.exports = {

    getOne: async (req, res) => {
        const CommentData = await Model.Comment.findById(req.params.id)
            // .populate('authorId')
            // .populate('postId')
            // .populate('playListId')
            .select({ softDelete: 0, updatedAt: 0 })
            .lean()
        CommentData.createdAt = moment(CommentData.createdAt, "X").
            format("jYYYY/jMM/jDD HH:mm")
        if (CommentData.softDelete || !CommentData) { return resBilder.notFound(res, "کامنت یافت نشد.") }
        return resBilder.success(res, CommentData, "")

    },

    post: {

        create: async (req, res) => {
            try {
                const result = await Schema.commentValidation.createPostSchema.validate(req.body, req.params)
                if (result.error) { return resBilder.invalidReq(res, req.body, result.error.message) }
                const data = await Joi.attempt(result.value, Schema.commentValidation.createPostSchema)
                //=============
                data.postId = req.params.postId
                data.authorId = req.userId
                const comment = new Model.Comment(data)
                await comment.save()
                console.log(comment)
                return resBilder.created(res, comment, "کامنت شما با موفقیت ایجاد شد.")
            } catch (error) {
                console.log(error)
                return resBilder.internalFa(res)
            }
        },

        // getOne: async (req, res) => {},

        getAll: async (req, res) => {
            try {
                const commentData = await Model.Comment.find({ postId: req.params.postId })
                    // .populate('authorId')
                    // .populate('postId')
                    .select({ softDelete: 0, updatedAt: 0 })
                    .sort({ 'createdAt': -1 })

                    .lean();
                if (commentData.length == 0) { return resBilder.success(res, [], "") }
                // commentData.createdAt = moment(commentData.createdAt, "X").format("jYYYY/jMM/jDD HH:mm")
                // commentData.updatedAt = moment(commentData.updatedAt, "X").format("jYYYY/jMM/jDD HH:mm")
                return resBilder.success(res, commentData, "")
            } catch (error) {
                console.log("error for find a comment === > ", error)
                return resBilder.internalFa(res)
            }


        },

        upadte: async (req, res) => { },

        delete: async (req, res) => { },
    },

    playList: {
        create: async (req, res) => {
            try {
                const comment = new Comment({
                    username: req.body.username ? req.body.username : undefined,
                    description: req.body.description ? req.body.description : undefined,
                    date: moment(new Date()).format('X'),
                    postId: req.body.postId ? req.body.postId : undefined,
                    softDelete: false,
                    accepted: false
                })
                comment.save()
                return res.status(200).send("کامنت با موفقیت ثبت شد و درانتظار تایید ادمین قرار گرفت")

            } catch (error) {
                console.log(error)
                return res.status(500).send("مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
            }
        },
        getOne: async (req, res) => { },
        getAll: async (req, res) => { },
        upadte: async (req, res) => { },
        delete: async (req, res) => { },

    }
}
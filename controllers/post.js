'use strict'
const Model = require('../models/index')
const resBilder = require('../functions/responseBuilder')
const moment = require("jalali-moment");
const Joi = require('joi')
const appConfig = require('../config/application')
const Schema = require('../validation/post.validation')
const crudService = require("../service/crud.service")
module.exports = {


    create: async (req, res) => {
        try {
            const result = await Schema.createSchema.validate(req.body)
            if (result.error) { return resBilder.badRequest(res, req.body, result.error.message) }
            const data = await Joi.attempt(result.value, Schema.createSchema)
            data.authorId = req.userId
            const newPost = await crudService.create("Post", data)
            return resBilder.created(res, newPost, "مطلب شما با موفقیت ایجاد شد.")
        } catch (err) {
            console.log(err)
            return resBilder.internalFa(res)
        }
    },


    update: async (req, res) => {
        try {
            const result = await Schema.editSchema.validate(req.body)
            if (result.error) { return resBilder.badRequest(res, req.body, result.error.message) }
            const data = await Joi.attempt(result.value, Schema.editSchema)
            const updatedPost = await crudService.update("Post", data, req.params.id, "", ['authorId', 'tagIds', 'categoryIds', 'fileIds'], { softDelete: 0 })
            return resBilder.success(res, updatedPost, ".مطلب شما با موفقیت ویرایش شد")
        } catch (err) {
            console.log(err)
            return resBilder.internalFa(res)
        }
    },

    // getOne: async (req, res) => {
    //     try {
    //         const postData = await Model.Post.findById(req.params.id)
    //             .populate('fileIds')
    //             // .populate('userLikes')
    //             .lean();
    //         const likePostData = await Model.Post.find({ postId: req.params.id })
    //             .lean();
    //         if (postData.softDelete == true) { return resBilder.notFound(res, "این پست حدف شده است") }
    //         delete postData.softDelete
    //         postData.createdAt = moment(postData.createdAt, "X").format("jYYYY/jMM/jDD HH:mm")
    //         postData.updatedAt = moment(postData.updatedAt, "X").format("jYYYY/jMM/jDD HH:mm")
    //         return resBilder.success(res, postData, "")
    //     } catch (error) {
    //         console.log("error for find a post === > ", error)
    //         return resBilder.internalFa(res)

    //     }
    // },

    getOne: async (req, res) => {
        try {
            const postData = await crudService.getOne('Post', req.params.id, ['fileIds', 'authorId', 'tagIds', 'categoryIds'])
            if (postData.softDelete == true) { return resBilder.notFound(res, "این پست حدف شده است") }
            delete postData.softDelete
            return resBilder.success(res, postData, "")
        } catch (error) {
            console.log("error for find a post === > ", error)
            return resBilder.internalFa(res)
        }
    },



    getAll: async (req, res) => {
        try {
            const posts = await crudService.getAll('Posts',
                { softDelete: false, authorId: req.userId },
                "",
                { 'createdAt': -1 }, { softDelete: 0 })
            if (posts.length == 0) { return resBilder.success(res, [], "") }
            return resBilder.success(res, posts, "")
        } catch (err) {
            console.log(err)
            return resBilder.internalFa(res)
        }
    },

    delete: async (req, res) => {
        try {
            await crudService.delete("Post", req.params.id, { softDelete: true })
            return resBilder.success(res, "", "مطلب با موفقیت حذف شد")
        } catch (e) {
            console.log(e)
            return resBilder.internalFa(res)
        }
    },

    //======================================

    save: async (req, res) => { },

    unSave: async (req, res) => { },

    saved: async (req, res) => { },

    otherUserPosts: async (req, res) => {
        try {
            const posts = await Model.Post.find({ softDelete: false, authorId: req.params.userId })
                // .populate('authorId')
                // .populate('fileIds')
                .sort({ 'createdAt': -1 })
                .select({ softDelete: 0 })
                .lean();
            if (posts.length == 0) { return resBilder.success(res, "", "") }
            return resBilder.success(res, posts, "")
        } catch (err) {
            console.log(err)
            return resBilder.internalFa(res)
        }
    },

    like: async (req, res) => { },

    unLike: async (req, res) => { },

    liked: async (req, res) => { },

    usersLiked: async (req, res) => { },
}
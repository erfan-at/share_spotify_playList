const Model = require('../models/index')
const resBilder = require('../functions/responseBuilder')
const moment = require("jalali-moment");
const Joi = require('joi')
const appConfig = require('../config/application')
const Schema = require('../validation/playList.validation')

module.exports = {

    create: async (req, res) => {
        try {
            const result = await Schema.createSchema.validate(req.body)
            if (result.error) { return resBilder.invalidReq(res, req.body, result.error.message) }
            const data = await Joi.attempt(result.value, Schema.createSchema)
            //-----
            data.authorId = req.userId
            const playList = new Model.Playlist(data)
            const newplayList = await playList.save();
            return resBilder.created(res, newplayList, " پلی لیست شما با موفقیت ایجاد شد.")
        } catch (err) {
            console.log(err)
            return resBilder.internalFa(res)
        }
    },

    update: async (req, res) => {
        try {
            const result = await Schema.editSchema.validate(req.body)
            if (result.error) { return resBilder.invalidReq(res, req.body, result.error.message) }
            const data = await Joi.attempt(result.value, Schema.editSchema)
            //-----
            const updatedPlayList = await Model.Playlist.findByIdAndUpdate(req.params.id, data)
                // .populate('userLikes')
                // .populate('authorId')
                // .populate('fileIds')
                .select({ softDelete: 0 })
                .lean();
            updatedPlayList.updatedAt = moment(updatedPlayList.updatedAt, "X").format("jYYYY/jMM/jDD HH:mm")
            updatedPlayList.createdAt = moment(updatedPlayList.createdAt, "X").format("jYYYY/jMM/jDD HH:mm")
            return resBilder.success(res, updatedPlayList, ".پلی لیست شما با موفقیت ویرایش شد")
        } catch (err) {
            console.log(err)
            return resBilder.internalFa(res)
        }
    },

    getOne: async (req, res) => {
        try {
            const playlistData = await Model.Playlist.findById(req.params.id)
                // .populate('fileIds')
                .populate('userLikes')
                .lean();
            if (playlistData.softDelete == true) { return resBilder.notFound(res, "این پست حدف شده است") }
            delete playlistData.softDelete
            playlistData.createdAt = moment(playlistData.createdAt, "X").format("jYYYY/jMM/jDD HH:mm")
            playlistData.updatedAt = moment(playlistData.updatedAt, "X").format("jYYYY/jMM/jDD HH:mm")
            return resBilder.success(res, playlistData, "")
        } catch (error) {
            console.log("error for find a post === > ", error)
            return resBilder.internalFa(res)

        }
    },

    getAll: async (req, res) => {
        try {
            const playLists = await Model.Playlist.find({ softDelete: false, authorId: req.userId })
                // .populate('authorId')
                // .populate('fileIds')
                .sort({ 'createdAt': -1 })
                .select({ softDelete: 0 })
                .lean();
            if (playLists.length == 0) { return resBilder.success(res, "", "") }
            return resBilder.success(res, playLists, "")
        } catch (err) {
            console.log(err)
            return resBilder.internalFa(res)
        }
    },

    delete: async (req, res) => {
        try {
            await Model.Playlist.findByIdAndUpdate(req.params.id, { softDelete: true })
            return resBilder.success(res, "", "پلی لیست با موفقیت حذف شد")
        } catch (e) {
            console.log(e)
            return resBilder.internalFa(res)
        }
    },

    //=====================================

    save: async (req, res) => { },

    unSave: async (req, res) => { },

    saved: async (req, res) => { },

    otherUserPlayLists: async (req, res) => { },

    like: async (req, res) => { },

    unLike: async (req, res) => { },

    liked: async (req, res) => { },

    usersLiked: async (req, res) => { }

}
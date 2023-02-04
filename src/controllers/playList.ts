// import Model from '../models/index'
// import resBilder from '../functions/responseBuilder'
// import moment from "jalali-moment"
// import Joi from 'joi'
// import Schema from '../validation/playList.validation'
// import crudService from "../service/crud.service"

// export default{

//     create: async (req, res) => {
//         try {
//             const result = await Schema.createSchema.validate(req.body)
//             if (result.error) { return resBilder.invalidReq(res, req.body, result.error.message) }
//             const data = await Joi.attempt(result.value, Schema.createSchema)
//             data.authorId = req.userId
//             // const playList = new Model.Playlist(data)
//             // const newplayList = await playList.save();
//             const newplayList = await crudService.create("Playlist", data)
//             return resBilder.created(res, newplayList, " پلی لیست شما با موفقیت ایجاد شد.")
//         } catch (err) {
//             console.log(err)
//             return resBilder.internalFa(res)
//         }
//     },

//     update: async (req, res) => {
//         try {
//             const result = await Schema.editSchema.validate(req.body)
//             if (result.error) { return resBilder.invalidReq(res, req.body, result.error.message) }
//             const data = await Joi.attempt(result.value, Schema.editSchema)
//             const updatedPlayList = await crudService.update("Playlist",
//                 data,
//                 req.params.id,
//                 ['authorId', 'tagIds', 'categoryIds', 'fileIds'],
//                 { softDelete: 0 })
//             return resBilder.success(res, updatedPlayList, ".پلی لیست شما با موفقیت ویرایش شد")
//         } catch (err) {
//             console.log(err)
//             return resBilder.internalFa(res)
//         }
//     },

//     getOne: async (req, res) => {
//         try {
//             const playlistData = await crudService.getOne('Playlist', req.params.id, ['fileIds', 'authorId', 'tagIds', 'categoryIds'])
//             if (playlistData.softDelete == true) { return resBilder.notFound(res, "این پست حدف شده است") }
//             delete playlistData.softDelete
//             playlistData.createdAt = moment(playlistData.createdAt, "X").format("jYYYY/jMM/jDD HH:mm")
//             playlistData.updatedAt = moment(playlistData.updatedAt, "X").format("jYYYY/jMM/jDD HH:mm")
//             return resBilder.success(res, playlistData, "")
//         } catch (error) {
//             console.log("error for find a post === > ", error)
//             return resBilder.internalFa(res)

//         }
//     },

//     getAll: async (req, res) => {
//         try {
//             const playLists = await crudService.getAll('Playlist',
//                 { softDelete: false, authorId: req.userId },
//                 "",
//                 { 'createdAt': -1 }, { softDelete: 0 })
//             if (playLists.length == 0) { return resBilder.success(res, "", "") }
//             return resBilder.success(res, playLists, "")
//         } catch (err) {
//             console.log(err)
//             return resBilder.internalFa(res)
//         }
//     },

//     delete: async (req, res) => {
//         try {
//             await crudService.delete("Post", req.params.id, { softDelete: true })
//             return resBilder.success(res, "", ".پلی لیست با موفقیت حذف شد")
//         } catch (e) {
//             console.log(e)
//             return resBilder.internalFa(res)
//         }
//     },

//     //=====================================

//     save: async (req, res) => { },

//     unSave: async (req, res) => { },

//     saved: async (req, res) => { },

//     otherUserPlayLists: async (req, res) => {
//         try {
//             const playLists = await Model.Playlist.find({ softDelete: false, authorId: req.params.userId })
//                 // .populate('authorId')
//                 // .populate('fileIds')
//                 .sort({ 'createdAt': -1 })
//                 .select({ softDelete: 0 })
//                 .lean();
//             if (playLists.length == 0) { return resBilder.success(res, "", "") }
//             return resBilder.success(res, playLists, "")
//         } catch (err) {
//             console.log(err)
//             return resBilder.internalFa(res)
//         }
//     },

//     like: async (req, res) => { },

//     unLike: async (req, res) => { },

//     liked: async (req, res) => { },

//     usersLiked: async (req, res) => { }

// }
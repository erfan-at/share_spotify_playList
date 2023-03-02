import Service from '../service/index'
import resBuilder from '../library/responseBuilder'
import Joi from 'joi'
import Schema from '../validation/index'

export default {

    create: async (req: any, res: any) => {
        const result = Schema.playListValidation.createSchema.validate(req.body)
        if (result.error) { return resBuilder.badRequest(res, req.body, result.error.message) }
        try {
            const data = await Joi.attempt(result.value, Schema.playListValidation.createSchema)
            data.authorId = req.userId
            const newplayList = await Service.CRUD.create("PlayList", data)
            return resBuilder.created(res, newplayList, " پلی لیست شما با موفقیت ایجاد شد.")
        } catch (err) {
            console.log(err)
            return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")

        }
    },

    getOne: async (req: any, res: any) => {
        try {
            // const playlistData = await Service.CRUD.findById('PlayList', req.params.id, ['fileIds', 'authorId', 'tagIds', 'categoryIds'])
            const playlistData = await Service.CRUD.findById('PlayList', req.params.id, [])
            if (playlistData.softDelete == true) { return resBuilder.notFound(res, "این پست حدف شده است") }
            delete playlistData.softDelete
            return resBuilder.success(res, playlistData, "")
        } catch (error) {
            console.log("error for find a post === > ", error)
            return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")

        }
    },

    getAll: async (req: any, res: any) => {
        try {
            const playLists = await Service.CRUD.getAll('PlayList',
                { softDelete: false, authorId: req.userId },
                "",
                { 'createdAt': -1 }, { softDelete: 0 })
            if (playLists.length == 0) { return resBuilder.success(res, "", "") }
            return resBuilder.success(res, playLists, "")
        } catch (err) {
            console.log(err)
            return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
        }
    },

    update: async (req: any, res: any) => {
        //         try {
        //             const result = await Schema.editSchema.validate(req.body)
        //             if (result.error) { return resBuilder.badRequest(res, req.body, result.error.message) }
        //             const data = await Joi.attempt(result.value, Schema.editSchema)
        //             const updatedPlayList = await Service.CRUD.update("Playlist",
        //                 data,
        //                 req.params.id,
        //                 ['authorId', 'tagIds', 'categoryIds', 'fileIds'],
        //                 { softDelete: 0 })
        //             return resBuilder.success(res, updatedPlayList, ".پلی لیست شما با موفقیت ویرایش شد")
        //         } catch (err) {
        //             console.log(err)
        //                         return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")

        //         }
    },

    delete: async (req: any, res: any) => {
        try {
            await Service.CRUD.delete("PlayList", req.params.id, { softDelete: true })
            return resBuilder.success(res, "", ".پلی لیست با موفقیت حذف شد")
        } catch (err) {
            console.log(err)
            return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
        }
    },

    //     //=====================================

    save: async (req: any, res: any) => { },

    unSave: async (req: any, res: any) => { },

    saved: async (req: any, res: any) => { },

    //     otherUserPlayLists: async (req:any, res:any) => {
    //         try {
    //             const playLists = await Model.Playlist.find({ softDelete: false, authorId: req.params.userId })
    //                 // .populate('authorId')
    //                 // .populate('fileIds')
    //                 .sort({ 'createdAt': -1 })
    //                 .select({ softDelete: 0 })
    //                 .lean();
    //             if (playLists.length == 0) { return resBuilder.success(res, "", "") }
    //             return resBuilder.success(res, playLists, "")
    //         } catch (err) {
    //             console.log(err)
    //                         return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")

    //         }
    //     },

    like: async (req: any, res: any) => { },

    unLike: async (req: any, res: any) => { },

    liked: async (req: any, res: any) => { },

    usersLiked: async (req: any, res: any) => { }

}
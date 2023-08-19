import Service from '../service/index'
import responseBuilder from '../library/responseBuilder'
import Joi from 'joi'
import Schema from '../validation/index'
import chalk from 'chalk';

export default {

    create: async (req: any, res: any) => {
        const result = Schema.playListValidation.createSchema.validate(req.body)
        if (result.error) { return responseBuilder.badRequest(res, req.body, result.error.message) }
        try {
            const data = await Joi.attempt(result.value, Schema.playListValidation.createSchema)
            data.authorId = req.userData._id
            const newplayList = await Service.CRUD.create("PlayList", data)
            return responseBuilder.created(res, newplayList, " پلی لیست شما با موفقیت ایجاد شد.")
        } catch (err) {
            console.log(chalk.underline.red("✖ err from catch of controller : "))
            console.log(chalk.red(err))
            console.log(chalk.underline.red("✖ err from catch of controller : "))
            return responseBuilder.internalErr(res)
        }
    },

    getOne: async (req: any, res: any) => {
        try {
            
            // const playlistData = await Service.CRUD.findById('PlayList', req.params.id, ['fileIds', 'authorId', 'tagIds', 'categoryIds'])
            const playlistData = await Service.CRUD.findById('PlayList', req.params.id, [])
            if (!playlistData || playlistData.softDelete) { return responseBuilder.notFound(res, '',"این پلی لیست حدف شده است") }
            delete playlistData.softDelete
            return responseBuilder.success(res, playlistData )
        } catch (err) {
            console.log(chalk.underline.red("✖ err from catch of controller : "))
            console.log(chalk.red(err))
            console.log(chalk.underline.red("✖ err from catch of controller : "))
            return responseBuilder.internalErr(res)
        }
    },

    getAll: async (req: any, res: any) => {
        try {
            const playLists = await Service.CRUD.getAll('PlayList',
                { softDelete: false, authorId: req.userData._id},
                "",
                { 'createdAt': -1 }, { softDelete: 0 })
            if (playLists.length == 0) { return responseBuilder.success(res, []) }
            return responseBuilder.success(res, playLists)
        } catch (err) {
            console.log(chalk.underline.red("✖ err from catch of controller : "))
            console.log(chalk.red(err))
            console.log(chalk.underline.red("✖ err from catch of controller : "))
            return responseBuilder.internalErr(res)
        }
    },

    update: async (req: any, res: any) => {
        const result = Schema.playListValidation.editSchema.validate(req.body)
        if (result.error) { return responseBuilder.badRequest(res, req.body, result.error.message) }
        try {
            const postExist = await Service.CRUD.findById('PlayList', req.params.id, [])
            if (!postExist) { return responseBuilder.notFound(res, "",'پلی لیست یافت نشد') }
            const data = await Joi.attempt(result.value, Schema.playListValidation.editSchema)
            const updatedPlayList = await Service.CRUD.updateById("PlayList",
                data,
                req.params.id,
                ['authorId', 'tagIds', 'categoryIds', 'fileIds'],
                { softDelete: 0 })
            return responseBuilder.success(res, updatedPlayList, ".پلی لیست شما با موفقیت ویرایش شد")
        } catch (err) {
            console.log(chalk.underline.red("✖ err from catch of controller : "))
            console.log(chalk.red(err))
            console.log(chalk.underline.red("✖ err from catch of controller : "))
            return responseBuilder.internalErr(res)
        }
    },

    delete: async (req: any, res: any) => {
        try {
            await Service.CRUD.delete("PlayList", req.params.id, { softDelete: true })
            return responseBuilder.success(res, "", ".پلی لیست با موفقیت حذف شد")
        } catch (err) {
            console.log(chalk.underline.red("✖ err from catch of controller : "))
            console.log(chalk.red(err))
            console.log(chalk.underline.red("✖ err from catch of controller : "))
            return responseBuilder.internalErr(res)
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
    //             if (playLists.length == 0) { return responseBuilder.success(res, "", "") }
    //             return responseBuilder.success(res, playLists, "")
    //         } catch (err) {
    //             console.log(err)
    //                         return responseBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")

    //         }
    //     },

    like: async (req: any, res: any) => { },

    unLike: async (req: any, res: any) => { },

    
    liked: async (req: any, res: any) => { },

    usersLiked: async (req: any, res: any) => { }

}
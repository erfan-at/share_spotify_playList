import Service from '../service/index'
import resBuilder from '../library/responseBuilder'
import Joi from 'joi'
import Schema from '../validation/index'
import chalk from 'chalk';

export default {

    create: async (req: any, res: any) => {
        const result = Schema.postValidation.createSchema.validate(req.body)
        if (result.error) { return resBuilder.badRequest(res, req.body, result.error.message) }
        try {
            const data = await Joi.attempt(result.value, Schema.postValidation.createSchema)
            data.authorId = req.userData._id
            const newPost = await Service.CRUD.create("Post", data)
            return resBuilder.created(res, newPost, "مطلب شما با موفقیت ایجاد شد.")
        } catch (err) {
            console.log(err)
            return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
        }
    },

    update: async (req: any, res: any) => {
        const result = Schema.postValidation.editSchema.validate(req.body)
        if (result.error) { return resBuilder.badRequest(res, req.body, result.error.message) }
        try {
            const data = await Joi.attempt(result.value, Schema.postValidation.editSchema)
            const postExist = await Service.CRUD.findById('Post', req.params.id, [])
            if (!postExist) { return resBuilder.notFound(res, "",'پست یافت نشد') }
            const updatedPost = await Service.CRUD.updateById("Post", data, req.params.id, ['authorId', 'tagIds', 'categoryIds', 'fileIds'], { softDelete: 0 })
            return resBuilder.success(res, updatedPost, ".مطلب شما با موفقیت ویرایش شد")
        } catch (err) {
            console.log(err)
            return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")

        }
    },

    getOne: async (req: any, res: any) => {
        try {
            // const postData = await Service.CRUD.findById('Post', req.params.id, ['fileIds', 'authorId', 'tagIds', 'categoryIds'])
            const postData = await Service.CRUD.findById('Post', req.params.id, ["fileIds", "authorId", "tagIds"])
            if (postData.softDelete == true) { return resBuilder.notFound(res,"", "این پست حدف شده است") }
            delete postData.softDelete
            return resBuilder.success(res, postData, "")
        } catch (error) {
            console.log("error for find a post === > ", error)
            return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")

        }
    },

    getAll: async (req: any, res: any) => {
        try {
            const posts = await Service.CRUD.getAll('Post',
                { softDelete: false, authorId: req.userData._id }, "",
                { 'createdAt': -1 }, { softDelete: 0 })
            if (posts.length == 0) { return resBuilder.success(res, [], "") }
            return resBuilder.success(res, posts, "")
        } catch (err) {
            console.log(err)
            return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
        }
    },

    delete: async (req: any, res: any) => {
        try {
            await Service.CRUD.delete("Post", req.params.id, { softDelete: true })
            return resBuilder.success(res, "", "مطلب با موفقیت حذف شد")
        } catch (e) {
            console.log(e)
            return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")
        }
    },

    //     //======================================

    save: async (req: any, res: any) => { },
    unSave: async (req: any, res: any) => { },
    saved: async (req: any, res: any) => { },

    //     otherUserPosts: async (req:any, res:any) => {
    //         try {
    //             const posts = await Model.Post.find({ softDelete: false, authorId: req.params.userId })
    //                 // .populate('authorId')
    //                 // .populate('fileIds')
    //                 .sort({ 'createdAt': -1 })
    //                 .select({ softDelete: 0 })
    //                 .lean();
    //             if (posts.length == 0) { return resBuilder.success(res, "", "") }
    //             return resBuilder.success(res, posts, "")
    //         } catch (err) {
    //             console.log(err)
    //                        return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")

    //         }
    //     },

    like: async (req: any, res: any) => { },

    unLike: async (req: any, res: any) => { },

    liked: async (req: any, res: any) => { },

    usersLiked: async (req: any, res: any) => { },
}
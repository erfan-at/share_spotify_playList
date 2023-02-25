
import Model from '../models/index'
import resBuilder from '../library/responseBuilder'
import moment from "jalali-moment";
import Joi from 'joi'
// import appConfig from '../config/application'
// import Schema from '../validation/post.validation'
import Service from "../service/index"

export default {

    create: async (req: any, res: any) => {
        try {
            //     const result = await Schema.createSchema.validate(req.body)
            //     if (result.error) { return resBuilder.badRequest(res, req.body, result.error.message) }
            // const data = await Joi.attempt(result.value, Schema.createSchema)
            const data = req.body
            data.authorId = req.userId
            const newPost = await Service.CRUD.create("Post", data)
            return resBuilder.created(res, newPost, "مطلب شما با موفقیت ایجاد شد.")
        } catch (err) {
            console.log(err)
            return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")

        }
    },


    update: async (req: any, res: any) => {
        // try {
        //     const result = await Schema.editSchema.validate(req.body)
        //     if (result.error) { return resBuilder.badRequest(res, req.body, result.error.message) }
        //     const data = await Joi.attempt(result.value, Schema.editSchema)
        //     const updatedPost = await Service.CRUD.update("Post", data, req.params.id, "", ['authorId', 'tagIds', 'categoryIds', 'fileIds'], { softDelete: 0 })
        //     return resBuilder.success(res, updatedPost, ".مطلب شما با موفقیت ویرایش شد")
        // } catch (err) {
        //     console.log(err)
        //                return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")

        // }
    },

    //     // getOne: async (req, res) => {
    //     //     try {
    //     //         const postData = await Model.Post.findById(req.params.id)
    //     //             .populate('fileIds')
    //     //             // .populate('userLikes')
    //     //             .lean();
    //     //         const likePostData = await Model.Post.find({ postId: req.params.id })
    //     //             .lean();
    //     //         if (postData.softDelete == true) { return resBuilder.notFound(res, "این پست حدف شده است") }
    //     //         delete postData.softDelete
    //     //         postData.createdAt = moment(postData.createdAt, "X").format("jYYYY/jMM/jDD HH:mm")
    //     //         postData.updatedAt = moment(postData.updatedAt, "X").format("jYYYY/jMM/jDD HH:mm")
    //     //         return resBuilder.success(res, postData, "")
    //     //     } catch (error) {
    //     //         console.log("error for find a post === > ", error)
    //     //                    return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")


    //     //     }
    //     // },

    getOne: async (req: any, res: any) => {
        try {
            // const postData = await Service.CRUD.getOne('Post', req.params.id, ['fileIds', 'authorId', 'tagIds', 'categoryIds'])
            const postData = await Service.CRUD.getOne('Post', req.params.id, ["fileIds","authorId","tagIds"])

            if (postData.softDelete == true) { return resBuilder.notFound(res, "این پست حدف شده است") }
            delete postData.softDelete
            return resBuilder.success(res, postData, "")
        } catch (error) {
            console.log("error for find a post === > ", error)
            return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")

        }
    },



    getAll: async (req: any, res: any) => {
        // try {
        //     const posts = await Service.CRUD.getAll('Posts',
        //         { softDelete: false, authorId: req.userId },
        //         "",
        //         { 'createdAt': -1 }, { softDelete: 0 })
        //     if (posts.length == 0) { return resBuilder.success(res, [], "") }
        //     return resBuilder.success(res, posts, "")
        // } catch (err) {
        //     console.log(err)
        //                return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")

        // }
    },

    delete: async (req: any, res: any) => {
        // try {
        //     await Service.CRUD.delete("Post", req.params.id, { softDelete: true })
        //     return resBuilder.success(res, "", "مطلب با موفقیت حذف شد")
        // } catch (e) {
        //     console.log(e)
        //                return resBuilder.internal(res, "مشکلی پیش آمده است لطفا با پشتیبانی تماس بگیرید")

        // }
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
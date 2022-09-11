module.exports = {


    create: async (req, res, next) => {
        try {
            var post = new Post({
                title: req.body.title ? req.body.title : undefined,
                description: req.body.description ? req.body.description : undefined,
                content: req.body.content ? req.body.content : undefined,
                category: req.body.category ? req.body.category : undefined,
                like: 0,
                disLike: 0,
                isVideo: req.body.isVideo ? req.body.isVideo : undefined,
                slider: req.body.slider ? req.body.slider : undefined,
                videoLink: req.body.videoLink,
                date: moment(new Date()).format('X'),
                authorId: req.userId,
                tags: req.body.tags ? req.body.tags : undefined,
                softDelete: false,
            })
            const newPost = await post.save();
            return res.status(201).send({ text: "خبر با موفقیت ساخته شد.", id: newPost.id })
        } catch (err) {
            console.log(err)
            return res.status(500).send("مشکلی پیش آمده است با پشتیبانی تماس بگیرید.")
        }
    },

    update: async (req, res) => {
        try {
            await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
            return res.status(200).send("ویرایش پست با موفقیت انجام شد.")
        } catch (e) {
            console.log(e)
            return res.status(500).send("مشکلی پیش آمده است با پشتیبانی تماس بگیرید.")
        }
    },

    getOne: async (req, res, next) => {
        try {
            // let post = await Post.findById(req.params.id).populate('authorId').populate('fileIds')
            let post = req.postData
            await Post.findByIdAndUpdate(req.params.id, { counter: post.counter + 1 })
            if (post.softDelete == true) { return res.status(404).send("این پست حدف شده است") }
            let commentsData = await Comment.find({ postId: req.params.id, softDelete: false, accepted: true })
            let comments
            if (commentsData) {
                comments = commentsData.map(a => {
                    return {
                        id: a.id,
                        username: a.username ? a.username : undefined,
                        date: a.date ? moment(a.date, 'X').format('jYYYY/jMM/jDD HH:mm') : undefined,
                        description: a.description ? a.description : undefined,
                        accepted: a.accepted ? a.accepted : undefined
                    }
                })
            } else { comment = [] }
            const postData = {
                id: post.id,
                title: post.title ? post.title : undefined,
                description: post.description ? post.description : undefined,
                content: post.content ? post.content : undefined,
                category: post.category ? categoryTranslateToFa(post.category).output : undefined,
                tags: post.tags ? post.tags : undefined,
                like: post.like ? post.like : undefined,
                disLike: post.disLike ? post.disLike : undefined,
                isVideo: post.isVideo ? post.isVideo : false,
                videoLink: post.videoLink ? post.videoLink : undefined,
                date: post.date ? moment(post.date, 'X').format('jYYYY/jMM/jDD HH:mm') : undefined,
                authorId: post.authorId ? post.authorId.id : undefined,
                authorName: post.authorId ? (post.authorId.name ? post.authorId.name : undefined) : undefined,
                files: post.fileIds.map(a => {
                    return {
                        id: a.id,
                        name: a.name ? a.name : undefined,
                        description: a.description ? a.description : undefined,
                        type: a.type ? a.type : undefined,
                        url: a.url ? a.url : undefined,
                        rawUrl: a.rawUrl ? a.rawUrl : undefined,
                        showName: a.showName ? a.showName : undefined,
                        status: a.status ? a.status : undefined
                    }
                }),
                comments: comments
            }
            if (!postData) { return res.status(200).send([]) }
            return res.status(200).send(postData)
        } catch (error) {
            console.log("error for find a post === > ", error)
            return res.status(500).send("مشکلی پیش آمده است با پشتیبانی تماس بگیرید")
        }
    },

    getAll: async (req, res, next) => {
        try {
            const posts = await Post.find({ softDelete: false })
                .populate('authorId')
                .populate('fileIds')
                .sort({ 'createdAt': -1 })
            if (posts.length == 0) { return res.status(200).send([]) }
            const allPosts = posts
                .map(a => {
                    return {
                        id: a.id,
                        title: a.title ? a.title : undefined,
                        // description: a.description ? a.description : undefined,
                        // content: a.content ? a.content : undefined,
                        controversial: a.controversial ? a.controversial : false,
                        tags: a.tags ? a.tags : undefined,
                        category: a.category ? categoryTranslateToFa(a.category).output : undefined,
                        like: a.like ? a.like : undefined,
                        disLike: a.disLike ? a.disLike : undefined,
                        isVideo: a.isVideo ? a.isVideo : false,
                        videoLink: a.videoLink ? a.videoLink : undefined,
                        date: a.date ? moment(a.date, 'X').format('jYYYY/jMM/jDD HH:mm') : undefined,
                        authorId: a.authorId ? a.authorId.id : undefined,
                        authorName: a.authorId ? (a.authorId.name ? a.authorId.name : undefined) : undefined,
                        // files: a.fileIds ? a.fileIds.map(a => {
                        //     return {
                        //         id: a.id,
                        //         name: a.name ? a.name : undefined,
                        //         description: a.description ? a.description : undefined,
                        //         type: a.type ? a.type : undefined,
                        //         url: a.url ? a.url : undefined,
                        //         rawUrl: a.rawUrl ? a.rawUrl : undefined,
                        //         showName: a.showName ? a.showName : undefined,
                        //         status: a.status ? a.status : undefined
                        //     }
                        // }) : undefined
                    }
                })
            return res.status(200).send(allPosts)
        } catch (err) {
            console.log(err)
            return res.status(500).send("مشکلی پیش آمده است با پشتیبانی تماس بگیرید")
        }
    },

    delete: async (req, res, next) => {
        try {
            await Post.findByIdAndUpdate(req.params.id, { softDelete: true })
            return res.status(200).send("خبر با موفقیت حذف شد")
        } catch (e) {
            console.log(e)
            return res.status(500).send("مشکلی پیش آمده است با پشتیبانی تماس بگیرید.")
        }
    },

    like: async (req, res, next) => { },
    unLike: async (req, res, next) => { },

}
module.exports = {

    getOne: async (req, res, next) => { },
    post: {
        create: async (req, res, next) => {
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
        getOne: async (req, res, next) => { },
        getAll: async (req, res, next) => { },
        upadte: async (req, res, next) => { },
        delete: async (req, res, next) => { },
    },
    playList: {
        create: async (req, res, next) => {
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
        getOne: async (req, res, next) => { },
        getAll: async (req, res, next) => { },
        upadte: async (req, res, next) => { },
        delete: async (req, res, next) => { },

    }
}
const router = require('express').Router();
const controller = require('../../controllers/index').user
const Middleware = require('../../middlewares/requestRequirement/commentErrorHandler')

router.get('/dashboard/profile', controller.profile.get)
router.put('/dashboard/profile', controller.profile.edit)
router.post('/dashboard/profile/addAvatar', controller.profile.addAvatar)
//=========================================
router.get('/dashboard/post', controller.post.getAll)
router.get('/dashboard/post/:id', controller.post.getOne)
router.post('/dashboard/post', controller.post.create)
router.put('/dashboard/post/:id', controller.post.update)
router.delete('/dashboard/post/:id', controller.post.delete)
//=========================================
router
    .route("/dashboard/playList")
    .get(controller.playList.getAll)
    .post(controller.playList.create)

router
    .route('/dashboard/playList/:id')
    .get(controller.playList.getOne)
    .put(controller.playList.update)
    .post(controller.playList.delete)
//=========================================
router.get('/dashboard/comment/:id', controller.comment.getOne)
//=========================================
router.get('/comments/post/:postId', controller.comment.post.getAll)
router.post('/comments/post/:postId', Middleware.createRequirementCheckPost, controller.comment.post.create)
router.put('/comments/post/:postId', controller.comment.post.upadte)
router.delete('/comments/post/:postId', controller.comment.post.delete)
//=========================================
router.get('/comments/playList/:playListId', controller.comment.playList.getAll)
router.post('/comments/playList/:playListId', controller.comment.playList.create)
router.put('/comments/playList/:playListId', controller.comment.playList.upadte)
router.delete('/comments/playList/:playListId', controller.comment.playList.delete)
//=========================================
router.post('/like/post/:id', controller.post.like)
router.post('/unLike/post/:id', controller.post.unLike)
//=========
router.post('/like/playList/:id', controller.playList.like)
router.post('/unLike/playList/:id', controller.playList.unLike)

module.exports = router;
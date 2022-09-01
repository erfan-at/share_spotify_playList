const router = require('express').Router();
const controller = require('../../controllers/index').user

router.get('/dashboard/post', controller.post.getAll)
router.get('/dashboard/post/:id', controller.post.getOne)
router.post('/dashboard/post', controller.post.create)
router.put('/dashboard/post/:id', controller.post.upadte)
router.delete('/dashboard/post/:id', controller.post.delete)
//=========================================
router.get('/dashboard/playList', controller.playList.getAll)
router.get('/dashboard/playList/:id', controller.playList.getOne)
router.post('/dashboard/playList', controller.playList.create)
router.put('/dashboard/playList/:id', controller.playList.upadte)
router.delete('/dashboard/playList/:id', controller.playList.delete)
//=========================================
router.get('/comments/post/:postId', controller.comment.post.getAll)
router.post('/comments/post/:postId', controller.comment.post.create)
router.put('/comments/post/:postId', controller.comment.post.upadte)
router.delete('/comments/post/:postId', controller.comment.post.delete)
//=========================================
router.get('/comments/playList/:playListId', controller.comment.playList.getAll)
router.post('/comments/playList/:playListId', controller.comment.playList.create)
router.put('/comments/playList/:playListId', controller.comment.playList.upadte)
router.delete('/comments/playList/:playListId', controller.comment.playList.delete)
//=========================================
router.get('/dashboard/comment/:Id', controller.comment.getOne)
//=========================================
router.post('/like/post/:id', controller.post.like)
router.post('/unLike/post/:id', controller.post.unLike)
//=========
router.post('/like/playList/:id', controller.playList.like)
router.post('/unLike/playList/:id', controller.playList.unLike)

module.exports = router;
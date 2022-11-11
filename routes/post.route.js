const router = require('express').Router();
const controller = require('../controllers/index').user
const Middleware = require('../middlewares/requestRequirement/commentErrorHandler')
//=========================================
router
    .route("/post")
    .get(controller.post.getAll)
    .post(controller.post.create)
router
    .route("/post/:id")
    .get(controller.post.getOne)
    .put(controller.post.update)
    .delete(controller.post.delete)

// router.put("/post/save/:id")
// router.put("/post/unSave/:id")
// router.get("/post/save") //getAll
// router.get("/posts/user/:userId",)
router.put("/post/like/:id", controller.post.like)
router.put("/post/unLike/:id", controller.post.unLike)
//=========================================
router.get('/post/comment/:id', controller.comment.getOne)
//=========================================
// router.get('/comments/post/:postId', controller.comment.post.getAll)
// router.post('/comments/post/:postId', Middleware.createRequirementCheckPost, controller.comment.post.create)
// router.put('/comments/post/:postId', controller.comment.post.upadte)
// router.delete('/comments/post/:postId', controller.comment.post.delete)
module.exports = router;
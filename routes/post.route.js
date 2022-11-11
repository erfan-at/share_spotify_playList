const router = require('express').Router();
const controller = require('../controllers/index').post
const Middleware = require('../middlewares/requestRequirement/commentErrorHandler')
//=========================================
router.get("/", controller.getAll)
router.post("/", controller.create)
router.get("/:id", controller.getOne)
router.put("/:id", controller.update)
router.delete("/:id", controller.delete)

router.put("/save/:id", controller.save)
router.put("/unSave/:id", controller.unSave)
router.get("/saved", controller.saved) //getAll

router.get("/user/:userId", controller.otherUserPosts) //other user posts

router.put("/like/:id", controller.like)
router.put("/unLike/:id", controller.unLike)
router.get("/liked", controller.unLike) //getAll like posts self
//=========================================
router.get('/comment/:id', controller.comment.getOne)
//=========================================
// router.get('/comments/post/:postId', controller.comment.post.getAll)
// router.post('/comments/post/:postId', Middleware.createRequirementCheckPost, controller.comment.post.create)
// router.put('/comments/post/:postId', controller.comment.post.upadte)
// router.delete('/comments/post/:postId', controller.comment.post.delete)
module.exports = router;
const router = require('express').Router();
const controller = require('../controllers/index').playList
const Middleware = require('../middlewares/requestRequirement/commentErrorHandler')

//=========================================
router.get("/", controller.getAll)
router.post("/", controller.create)
router.get("/:id", controller.getOne)
router.put("/:id", controller.update)
router.delete("/:id", controller.delete)
//=========================================
router.get("/user/:userId", controller.otherUserPlayLists)
//=========================================
router.put("/save/:id")
router.put("/unSave/:id")
router.get("/saved") //getAll
//=========================================
router.get("/usersLiked", controller.usersLiked)
router.put('/like/:id', controller.like)
router.put('/unlike/:id', controller.unLike)
router.get("/liked", controller.liked) //getAll
//=========================================
// router.get('/comment/:id', controller.comment.getOne)
//=========================================
// router.get('/comments/playList/:playListId', controller.comment.playList.getAll)
// router.post('/comments/playList/:playListId', controller.comment.playList.create)
// router.put('/comments/playList/:playListId', controller.comment.playList.upadte)
// router.delete('/comments/playList/:playListId', controller.comment.playList.delete)
//=========================================
module.exports = router;
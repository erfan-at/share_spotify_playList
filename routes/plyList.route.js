const router = require('express').Router();
const controller = require('../controllers/index').user
const Middleware = require('../middlewares/requestRequirement/commentErrorHandler')

//=========================================
router
    .route("/playList")
    .get(controller.playList.getAll)
    .post(controller.playList.create)

router
    .route('/playList/:id')
    .get(controller.playList.getOne)
    .put(controller.playList.update)
    .post(controller.playList.delete)

// router.put("/playList/save/:id")
// router.put("/playList/unSave/:id")
// router.get("/playList/save") //getAll
// router.get("/playLists/user/:userId",)
router.get("/playLists/user/:userId",)
router.put('/playList/like/:id', controller.playList.like)
router.put('/playList/unlike/:id', controller.playList.unLike)
//=========================================
router.get('/playList/comment/:id', controller.comment.getOne)
//=========================================
// router.get('/comments/playList/:playListId', controller.comment.playList.getAll)
// router.post('/comments/playList/:playListId', controller.comment.playList.create)
// router.put('/comments/playList/:playListId', controller.comment.playList.upadte)
// router.delete('/comments/playList/:playListId', controller.comment.playList.delete)
//=========================================

module.exports = router;
import { Router } from 'express';

import controller from '../controllers/index';

// import Middleware from '../middlewares/requestRequirement/commentErrorHandler'
const router = Router();
// //=========================================
router.get('/', controller.playList.getAll);
router.post('/', controller.playList.create);
router.get('/:id', controller.playList.getOne);
router.put('/:id', controller.playList.update);
router.delete('/:id', controller.playList.delete);
// //=========================================
// router.get("/user/:userId", controller.playList.otherUserPlayLists)
// //=========================================
// router.put("/save/:id")
// router.put("/unSave/:id")
// router.get("/saved") //getAll
// //=========================================
// router.get("/usersLiked", controller.playList.usersLiked)
// router.put('/like/:id', controller.playList.like)
// router.put('/unlike/:id', controller.playList.unLike)
// router.get("/liked", controller.playList.liked) //getAll
// //=========================================
// // router.get('/comment/:id', controller.playList.comment.getOne)
// //=========================================
// // router.get('/comments/playList/:playListId', controller.playList.comment.playList.getAll)
// // router.post('/comments/playList/:playListId', controller.playList.comment.playList.create)
// // router.put('/comments/playList/:playListId', controller.playList.comment.playList.upadte)
// // router.delete('/comments/playList/:playListId', controller.playList.comment.playList.delete)
// //=========================================
export default router;

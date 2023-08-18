import { Router } from 'express';

import controller from '../controllers/index';

// import Middleware from '../middlewares/requestRequirement/commentErrorHandler'
const router = Router();
// //=========================================
router.get('/?comment', controller.post.getAll);
router.post('/', controller.post.create);
router.get('/:id', controller.post.getOne);
router.put('/:id', controller.post.update);
router.delete('/:id', controller.post.delete);
// //=========================================
// router.get("/user/:userId", controller.otherUserPosts) //other user posts
// //=========================================
// router.put("/save/:id", controller.save)
// router.put("/unSave/:id", controller.unSave)
// router.get("/saved", controller.saved) //getAll save posts self
// //=========================================
// router.get("/usersLiked", controller.usersLiked)
// router.put("/like/:id", controller.like)
// router.put("/unLike/:id", controller.unLike)
// router.get("/liked", controller.unLike) //getAll like posts self
// //=========================================
// // router.get('/comment/:id', controller.comment.getOne)
// //=========================================
// // router.get('/comments/post/:postId', controller.comment.post.getAll)
// // router.post('/comments/post/:postId', Middleware.createRequirementCheckPost, controller.comment.post.create)
// // router.put('/comments/post/:postId', controller.comment.post.upadte)
// // router.delete('/comments/post/:postId', controller.comment.post.delete)
export default router;

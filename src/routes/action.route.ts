import { Router } from 'express';

import controller from '../controllers/index';

// import Middleware from '../middlewares/requestRequirement/commentErrorHandler'
const router = Router();
// //=========================================
router.post('/psot/like', controller.action.likePost);
router.post('/playList/like', controller.action.likePlayList);
router.post('/psot/comment', controller.action.commentPost);
router.post('/playList/comment', controller.action.commentPlayList);
router.post('/psot/save', controller.action.savePost);
router.post('/playList/save', controller.action.savePlayList);


export default router;

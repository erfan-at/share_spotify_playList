import { Router } from 'express';
import controller from '../controllers/index';
const router = Router();

router.get('/profile', controller.user.get);
router.put('/profile', controller.user.edit);
// router.post('/profile/addAvatar', controller.user.addAvatar)
router.get('/followers', controller.user.get); //getAll
router.get('/followings', controller.user.get); //getAll
router.put('/follow/:userId', controller.user.get);
router.put('/unFollow/:userId', controller.user.get);

// // router.get('/userProfile/:userId', controller.user.get) //getOne
// //other user
router.get('/profile/:userId', controller.user.getOtherUserProfile);
router.get('/profile/followers/:userId', controller.user.getOtherUserFollowers);
router.get('/profile/followings/:userId', controller.user.getOtherUserFollowings);

export default router;

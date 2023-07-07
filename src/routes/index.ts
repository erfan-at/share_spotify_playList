import { Router } from 'express';
const router = Router();
import auth from './auth.route';
import post from './post.route';
import playList from './plyList.route';
import home from './home.route';
import user from './user.route';

router.use('/auth', auth);
router.use('/', home);
router.use('/user', /* recordActivity*/ user);
router.use('/post', /*funcs.recordActivityMid,*/ post);
router.use('/playList', /*funcs.recordActivityMid,*/ playList);
// router.use('/admin', funcs.checkAdminExist, funcs.recordActivity, admin)

export default router;

import { Router } from 'express';
const router = Router();
import auth from './auth.route';
import post from './post.route';
import playList from './plyList.route';
import home from './home.route';
import user from './user.route';
import action from "./action.route"
import users from './users.route'
import Middlewares from '../middlewares/index';

router.use('/auth', auth);
router.use('/', home);
router.use('/user', Middlewares.recordActivityMiddleware, user);
router.use('/post', Middlewares.recordActivityMiddleware, post);
router.use('/playList', Middlewares.recordActivityMiddleware, playList);
router.use('/action', Middlewares.recordActivityMiddleware, action);
router.use('/users', Middlewares.recordActivityMiddleware, users);


// router.use('/admin', funcs.checkAdminExist, funcs.recordActivity, admin)

export default router;

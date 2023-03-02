import { Router } from 'express';
import funcs from '../library/functions'

// import  user from './user.route'
// // import  admin from './admin/admin.route')
import auth from './auth.route'
import post from "./post.route"
import playList from "./plyList.route"
import home from "./home.route"
import user from "./user.route"


const router = Router()
// router.get('/ping', (req: Request, res: Response) => { return res.send("pong") })
router.use('/auth', auth)
router.use("/", home)
router.use('/user', funcs.authenticateToken, funcs.checkUserExist, /* recordActivity*/ user)
router.use('/post', funcs.authenticateToken, funcs.checkUserExist, /*funcs.recordActivityMid,*/ post)
router.use('/playList', funcs.authenticateToken, funcs.checkUserExist, /*funcs.recordActivityMid,*/ playList)
// router.use('/admin', funcs.authenticateToken, funcs.checkAdminExist, funcs.recordActivity, admin)

export default router





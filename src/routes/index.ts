import { Router,Request,Response } from 'express';
// import  { authenticateToken, checkUserExist, checkAdminExist, recordActivity } from '../functions/auth.function'

// import  user from './user.route'
// // import  admin from './admin/admin.route')
import  auth from './auth.route'
// import  post from "./post.route"
// import  playList from "./plyList.route"

const router=Router()
router.get('/ping', (req:Request, res:Response) => { return res.send("pong") })
router.use('/auth', auth)
// router.use('/user', authenticateToken, checkUserExist, recordActivity, user)
// // router.use('/admin', authenticateToken, checkAdminExist, recordActivity, admin)
// router.use('/post', authenticateToken, checkUserExist, recordActivity, post)
// router.use('/playList', authenticateToken, checkUserExist, recordActivity, playList)

export {router}
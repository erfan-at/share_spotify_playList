import { Router, Request, Response } from 'express';
import controller from '../controllers/index'
const router = Router()

router.get('/ping', controller.home.ping)
router.get("/home", controller.home.home)

export default router




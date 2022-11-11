const router = require('express').Router()
const controller = require("../controllers/index").profile
// const Middleware = require('../middlewares/requestRequirement/commentErrorHandler')
// 
router.get('/profile', controller.get)
router.put('/profile', controller.edit)
router.post('/profile/addAvatar', controller.addAvatar)

router.get('/followers', controller.get) //getAll
router.get('/followings', controller.get) //getAll
router.get('/userProfile/:userId', controller.get) //getOne

router.put('/follow/:userId', controller.get)
router.put('/unFollow/:userId', controller.get)

module.exports = router;
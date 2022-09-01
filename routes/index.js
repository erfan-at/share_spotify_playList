const router = require('express').Router();
const user = require('./user/user.router')
const admin = require('./admin/admin.router')
const auth = require('./auth')

router.use('/user', user)
router.use('/admin', admin)
router.use('/auth', auth)

module.exports = router;

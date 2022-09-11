const router = require('express').Router();
const user = require('./user/user.router')
const admin = require('./admin/admin.router')
const auth = require('./auth')
const { authenticateToken, checkUserExist, checkAdminExist, recordActivity } = require('../functions/auth.function')
router.get('/ping', (req, res) => { return res.send("ping") })
router.use('/auth', auth)
router.use('/user', authenticateToken, checkUserExist, recordActivity, user)
router.use('/admin', authenticateToken, checkAdminExist, recordActivity, admin)

module.exports = router;

const router = require('express').Router();
const user = require('./user/user.route')
const admin = require('./admin/admin.route')
const auth = require('./auth.route')
const { authenticateToken, checkUserExist, checkAdminExist, recordActivity } = require('../functions/auth.function')
router.get('/ping', (req, res) => { return res.send("pong") })
router.use('/auth', auth)
router.use('/user', authenticateToken, checkUserExist, recordActivity, user)
router.use('/admin', authenticateToken, checkAdminExist, recordActivity, admin)

module.exports = router;

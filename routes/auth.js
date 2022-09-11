const router = require('express').Router();
const controller = require('../controllers/auth/index')

router.post("/adminLogin", controller.admin.adminLogin)
router.post("/adminResetPasswordActivationCode", controller.admin.adminResetPasswordGetActivationCode);
router.post('/adminResetPassword', controller.admin.adminResetPassword)
//===============================================
router.post("/userSignup", controller.user.userSignup)
router.post("/userEntrance", controller.user.userEntrance)
router.post("/userLogin", controller.user.userLogin);
router.post("/userResetPasswordActivationCode", controller.user.userResetPasswordActivationCode);
router.post("/userResetPassword", controller.user.userResetPassword)

module.exports = router;
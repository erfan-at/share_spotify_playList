const router = require('express').Router();
const controller = require('../controllers/auth/index')
const Middlware = require('../middlewares/requestRequirement/authErrorHandler')

router.post("/adminLogin", Middlware.authLoginRequirementCheck, controller.admin.adminLogin)
router.post("/adminResetPasswordActivationCode", Middlware.authResetPasswordActivatiobCodeRequirementCheck, controller.admin.userResetPasswordActivationCode);
router.post('/adminResetPassword', Middlware.authResetPasswordRequirementCheck, controller.admin.adminResetPassword)
//===============================================
router.post("/userSignup", Middlware.authSignupRequirementCheck, controller.user.userSignup)
router.post("/userLogin", Middlware.authLoginRequirementCheck, controller.user.userLogin);
router.post("/userEntrance", Middlware.authEntranceRequirementCheck, controller.user.userEntrance)
router.post("/userGetActivationCode", Middlware.authResetPasswordActivatiobCodeRequirementCheck, controller.user.userGetActivationCode);
router.post("/userResetPassword", Middlware.authResetPasswordRequirementCheck, controller.user.userResetPassword)

module.exports = router;
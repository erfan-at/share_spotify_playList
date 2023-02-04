'use strict'
const router = require('express').Router();
const controller = require('../controllers/auth/index')
const Middlware = require('../middlewares/requestRequirement/authErrorHandler')

router.post("/adminLogin", Middlware.authLoginRequirementCheck, controller.admin.adminLogin)
router.post("/adminResetPasswordActivationCode", Middlware.authResetPasswordActivatiobCodeRequirementCheck, controller.admin.userResetPasswordActivationCode);
router.post('/adminResetPassword', Middlware.authResetPasswordRequirementCheck, controller.admin.adminResetPassword)
//===============================================
router.post("/signup", Middlware.authSignupRequirementCheck, controller.user.userSignup)
router.post("/Login", Middlware.authLoginRequirementCheck, controller.user.userLogin);
router.post("/entrance", Middlware.authEntranceRequirementCheck, controller.user.userEntrance)
router.post("/getActivationCode", Middlware.authResetPasswordActivatiobCodeRequirementCheck, controller.user.userGetActivationCode);
router.post("/resetPassword", Middlware.authResetPasswordRequirementCheck, controller.user.userResetPassword)

module.exports = router;
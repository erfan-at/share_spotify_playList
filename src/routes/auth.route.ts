import { Router } from 'express';
import controller from '../controllers/index'
// import Middlware from '../middlewares/index'

const router = Router()
// router.post("/adminLogin", Middlware.authLoginRequirementCheck, controller.admin.adminLogin)
// router.post("/adminLogin", controller.auth.adminLogin)


// router.post("/adminResetPasswordActivationCode", Middlware.authResetPasswordActivatiobCodeRequirementCheck, controller.admin.userResetPasswordActivationCode);
// router.post('/adminResetPassword', Middlware.authResetPasswordRequirementCheck, controller.admin.adminResetPassword)
// //===============================================
// router.post("/signup", Middlware.authSignupRequirementCheck, controller.user.userSignup)
// router.post("/Login", Middlware.authLoginRequirementCheck, controller.user.userLogin);
// router.post("/entrance", Middlware.authEntranceRequirementCheck, controller.user.userEntrance)
// router.post("/getActivationCode", Middlware.authResetPasswordActivatiobCodeRequirementCheck, controller.user.userGetActivationCode);
// router.post("/resetPassword", Middlware.authResetPasswordRequirementCheck, controller.user.userResetPassword)

export default router;
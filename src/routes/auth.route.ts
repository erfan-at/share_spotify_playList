import { Router } from 'express';
import controller from '../controllers/index'
// import Middlware from '../middlewares/index'

const router = Router()
router.post("/createData", controller.auth.createData)

// router.post("/signup", Middlware.authSignupRequirementCheck, controller.user.userSignup)
router.post("/signup", controller.auth.Signup)

// router.post("/Login", Middlware.authLoginRequirementCheck, controller.user.userLogin);
router.post("/login", controller.auth.Login)

// router.post("/entrance", Middlware.authEntranceRequirementCheck, controller.auth.Entrance)
router.post("/entrance", controller.auth.Entrance)

// router.post("/resetPassword", Middlware.authResetPasswordRequirementCheck, controller.user.userResetPassword)
router.post("/resetPassword", controller.auth.ResetPassword)

// router.post("/resetPasswordActivationCode", Middlware.authResetPasswordActivatiobCodeRequirementCheck, controller.admin.userResetPasswordActivationCode);
router.post("/resetPasswordActivationCode",  controller.auth.ResetPasswordActivationCode);

export default router;
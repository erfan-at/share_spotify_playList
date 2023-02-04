import resBuilder from '../../functions/responseBuilder'

export default {
	async  authSignupRequirementCheck (req:Request, res:Response, next:any)  {
		try {
			if (!req.body.mobile) { return res.status(412).send("ارسال کردن شماره موبایل ضروری است!") }
			if (!req.body.email) { return res.status(412).send("ارسال کردن ایمیل ضروری است!") }
			if (!req.body.password) { return res.status(412).send("ارسال کردن پسورد ضروری است!") }
			if (!req.body.name) { return res.status(412).send("ارسال کردن نام و نام خانوادگی ضروری است!") }
			return next();

		} catch (error) { res.status(500).send("مشکلی پیش آمده است با پشتسبانی تماس بگیرید") }
	},
	async authLoginRequirementCheck (req:Request, res:Response, next:any) {
		try {
			if (!req.body.email && !req.body.mobile) { return resBuilder.invalidReq(res, "", "ارسال شماره موبایل یا آدرس ایمیل ضرروی است") }
			if (!req.body.password) { return resBuilder.invalidReq(res, "", "ارسال رمز عبور ضرروی است") }
			return next();
		} catch (error) { return resBuilder.internalFa(res) }
	},
	async authEntranceRequirementCheck (req:Request, res:Response, next:any)  {
		try {
			if (!req.body.mobile) { return resBuilder.invalidReq(res, "", "ارسال شماره موبایل ضروری است") }
			if (!req.body.activationCode) { return resBuilder.invalidReq(res, "", "ارسال کد ارسال شده ضروری است") }
			return next();
		} catch (error) { return resBuilder.internalFa(res) }
	},

	async authResetPasswordActivatiobCodeRequirementCheck (req:Request, res:Response, next:any) {
		try {
			if (!req.body.mobile) { return resBuilder.invalidReq(res, "", "ارسال شماره موبایل ضروری است") }
			return next();
		} catch (error) { return resBuilder.internalFa(res) }
	},
	async authResetPasswordRequirementCheck (req:Request, res:Response, next:any)  {
		try {
			if (!req.body.mobile) { return resBuilder.invalidReq(res, "", "ارسال شماره موبایل ضروری است") }
			if (!req.body.password) { return resBuilder.invalidReq(res, "", "ارسال رمز عبور ضروری است") }
			if (!req.body.activationCode) { return resBuilder.invalidReq(res, "", "ارسال کد فعال سازی ضروری است") }
			return next();
		} catch (error) { return resBuilder.internalFa(res) }
	},
}
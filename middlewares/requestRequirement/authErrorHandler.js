const asyncHandler = require("express-async-handler");

module.exports = {
	authSignupRequirementCheck: asyncHandler(async (req, res, next) => {
		try {
			if (!req.body.mobile) {
				return res.status(412).send("ارسال کردن شماره موبایل ضروری است!");
			}
			if (!req.body.password) {
				return res.status(412).send("ارسال کردن پسورد ضروری است!");
			}
			if (!req.body.name) {
				return res.status(412).send("ارسال کردن نام و نام خانوادگی ضروری است!");
			}
			next();

		} catch (error) {
			res.status(500).send("مشکلی پیش آمده است با پشتسبانی تماس بگیرید");
		}
	}),
	authLoginRequirementCheck: asyncHandler(async (req, res, next) => {
		try {
			if (!req.body.mobile) {
				return res.status(412).send("ارسال کردن شماره موبایل ضروری است!");
			}
			if (!req.body.password) {
				return res.status(412).send("ارسال کردن پسورد ضروری است!");
			}
			next();
		} catch (error) {
			res.status(500).send("مشکلی پیش آمده است با پشتسبانی تماس بگیرید");
		}
	}),
	authEntranceRequirementCheck: asyncHandler(async (req, res, next) => {
		try {
			if (!req.body.mobile) {
				return res.status(412).send("ارسال کردن شماره موبایل ضروری است!");
			}
			if (!req.body.activationCode) {
				return res.status(412).send("ارسال کردن کد فعال سازی ضروری است!");
			}
			next();
		} catch (error) {
			res.status(500).send("مشکلی پیش آمده است با پشتسبانی تماس بگیرید");
		}
	}),
	authResetPasswordActivatiobCodeRequirementCheck: asyncHandler(async (req, res, next) => {
		try {
			if (!req.body.mobile) {
				return res.status(412).send("ارسال کردن شماره موبایل ضروری است!");
			}
			next();
		} catch (error) {
			res.status(500).send("مشکلی پیش آمده است با پشتسبانی تماس بگیرید");
		}
	}),
	authResetPasswordRequirementCheck: asyncHandler(async (req, res, next) => {
		try {
			if (!req.body.mobile) {
				return res.status(412).send("ارسال کردن شماره موبایل ضروری است!");
			}
			if (!req.body.activationCode) {
				return res.status(412).send("ارسال کردن کد فعال سازی ضروری است!");
			}
			if (!req.body.password) {
				return res.status(412).send("ارسال کردن پسورد ضروری است!");
			}
			next();
		} catch (error) {
			res.status(500).send("مشکلی پیش آمده است با پشتسبانی تماس بگیرید");
		}
	}),
}
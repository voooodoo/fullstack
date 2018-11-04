const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async (req, res) => {
	const candidate = await User.findOne({ email: req.body.email });
	if (candidate) {
		const isPasswordOk = bcript.compareSync(req.body.password, candidate.password);
		if (isPasswordOk) {
			const token = jwt.sign(
				{
					email: candidate.email,
					userId: candidate._id,
				},
				keys.jwt,
				{ expiresIn: 60 * 60 }
			);
			res.status(200).json({
				token: `Bearer ${token}`,
			});
		} else {
			res.status(404).json({
				message: "Sorry, we couldn't find an account with that email/password.",
			});
		}
	} else {
		res.status(404).json({
			message: "Sorry, we couldn't find an account with that email/password.",
		});
	}
};

module.exports.register = async (req, res) => {
	const candidate = await User.findOne({ email: req.body.email });
	if (candidate) {
		res.status(409).json({
			message: 'This email exists',
		});
	} else {
		const salt = bcript.genSaltSync(10);
		const password = req.body.password;
		const user = new User({
			email: req.body.email,
			password: bcript.hashSync(password, salt),
		});

		try {
			await user.save();
			res.status(201).json(user);
		} catch (e) {
			errorHandler(res, e);
		}
	}
};

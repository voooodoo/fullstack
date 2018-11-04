module.exports.overview = (req, res) => {
	res.status(200).json({
		analytics: true,
	});
};

module.exports.analytics = (req, res) => {};

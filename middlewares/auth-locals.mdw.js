module.exports = (req, res, next) => {
	if (req.user) {
		res.locals.isAuthenticated = true;

		req.session.user = req.user;
	}

	next();
}
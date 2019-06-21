module.exports = (req, res, next) => {
	if (req.user) {
		res.locals.isAuthenticated = true;
		res.locals.authUser = req.user;
		req.session.user = req.user;
		res.locals.isActive = 0
	}

	next();
}
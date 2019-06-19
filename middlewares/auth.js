module.exports = (req, res, next) => {
	if (!req.session.user) {
		req.session.retUrl = req.originalUrl;
		res.redirect('/account/login');
	}
	else next();
}
module.exports = (req, res, next) => {
	if (!req.session.user) {
		req.session.retUrl = req.originalUrl;
		res.redirect('/account/login');
	} else if (req.user.Permission == 2) {
		next();
	} else {
		console.log('Editor access denied!');
	}
}
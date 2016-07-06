var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');

router.get('/', (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			throw error;
		}
		res.redirect('/?message=' + encodeURIComponent("Successfully logged out."));
	})
});

module.exports = router;

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');




router.get('/', function(request, response) {
	var user = request.session.user;
	if (user === undefined) {
		response.redirect('/?message=' + encodeURIComponent("Please log in."));
	} else {
		response.render('addRecipe', {});
	};
});


router.post('/addRecipe', bodyParser.urlencoded({
	extended: true
}), function(request, response) {
	var ID = request.session.user.id;

	db.recipe.create({
		title: request.body.title,
		body: request.body.body,
		ingredients: request.body.ingredients,
		user_id: ID

	}).then(function() {
		response.redirect('/addRecipe')
	});
});

module.exports = router;
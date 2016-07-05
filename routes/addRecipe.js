var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');




router.get('/', (req, res) => {
	var user = req.session.user;
	if (user === undefined) {
		res.redirect('/?message=' + encodeURIComponent("Please log in."));
	} else {
		res.render('addRecipe', {user:user});
	};
});


router.post('/addRecipe', bodyParser.urlencoded({
	extended: true
}), (req, res) => {
	var ID = req.session.user.id;
	var ingredientsArr = [];
	function addIngredients (ingredients) {
  	ingredientsArr.push(ingredients);
  	console.log("Ingredients: " + ingredientsArr.join(", "));
}

	db.recipe.create({
		title: request.body.title,
		body: request.body.body,
		ingredients: ingredientsArr,
		user_id: ID

	}).then(() => {
		res.redirect('/addRecipe')
	});
});

module.exports = router;
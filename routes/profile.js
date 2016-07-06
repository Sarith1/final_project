var express = require('express');
var router = express.Router();
var pg = require('pg');
var Sequelize = require('sequelize');
var session = require('express-session');
var db = require('../models/database');
var bodyParser = require('body-parser');

router.get('/',(req, res) => {
	var user = req.session.user;
	console.log('Getting session: ')
	console.log(req.session)
	console.log('Setting session user: ')
	console.log(user)
	if (user === undefined) {
		res.redirect('/?message=' + encodeURIComponent("Please log in to view your profile."));
	} else {
		var ID = req.session.user.id;
		db.recipe.findAll({
			where: {
				user_id: ID,
			}
		}).then(function(recipes) {
			var Data = recipes.map(function(myRecipes) {
				return {
					title: myRecipes.dataValues.title,
					ingredients: myRecipes.dataValues.ingredients,
					body: myRecipes.dataValues.body,
					rating: myRecipes.dataValues.rating,
					user_id: myRecipes.dataValues.user_id
				}


			})
			var usersRecipes = Data;

			console.log(usersRecipes);
			res.render('profile', {
				title: 'Your Profile',
				usersRecipes: usersRecipes,
				name: req.session.user.name
			});
		});
	}
});

module.exports = router;
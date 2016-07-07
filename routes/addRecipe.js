var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../models/database');
var pg = require('pg');
var Sequelize = require('sequelize');
var session = require('express-session');


router.get('/', (req, res) => {
	var user = req.session.user;
	if (user === undefined) {
		res.redirect('/?message=' + encodeURIComponent("Please log in."));
	} else {
		db.category.findAll().then(function(categories) {
			// console.log("ahdhasdhasdhashdashdahsdhashdashdhashh")
			var allCategories = categories.map(function(category) {
				// console.log("@&%E*^DUYTAGJKNANOD)(@E(*DUHA()*Y)(A*DS)(AS")
				// console.log(category.dataValues)
				return {
					name: category.dataValues.name,
					img: category.dataValues.img
						// img: db.category.img
				}
			})
			Catjes = allCategories;
			res.render('addRecipe', {
				title: 'Add Recipe',
				allCategories: Catjes
			})
		})
	}

});

router.post('/addRecipe', function(req, res){

	var ID = req.session.user.id;
	console.log("*********************")
	console.log(req.body.rating)
	console.log(req.body.category)


	db.recipe.create({
		title: req.body.title,
		body: req.body.body,
		ingredients: req.body.ingredients,
		rating: req.body.rating,
		category: req.body.category,
		userId: ID,

	}).then(function() {
		res.redirect('/profile')
	});
});

module.exports = router;


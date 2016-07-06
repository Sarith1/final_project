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
		res.render('addRecipe', {user:user}, {title: 'Categories'});
	};
});


router.post('/addRecipe', function(req, res){
	var ID = req.session.user.id;
	console.log("*********************")
	console.log(req.body.rating)


	db.recipe.create({
		title: req.body.title,
		body: req.body.body,
		ingredients: req.body.ingredients,
		rating: req.body.rating,
		user_id: ID

	}).then(function() {
		res.redirect('/profile')
	});
});

module.exports = router;


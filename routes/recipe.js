var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var db = require('../models/database');
var pg = require('pg');
var Sequelize = require('sequelize');
var session = require('express-session');


router.get('/:recipe', (req, res) => {
	console.log(req.params);
	var clickedRecipe = req.params.recipe;

	db.recipe.findAll({
		where: {
			title: clickedRecipe
		}
	}).then(function(recipes) {
		var Data = recipes.map(function(theRecipes) {
			return {
				title: theRecipes.dataValues.title,
				ingredients: theRecipes.dataValues.ingredients,
				body: theRecipes.dataValues.body,
				rating: theRecipes.dataValues.rating,
				category: theRecipes.dataValues.category,
				userId: theRecipes.dataValues.userId,
			}
		})
				

		var thisRecipe = Data;
	

	// .then(

	// db.category.findAll({
	// 	where: {
	// 		name: clickedCat
	// 	}
	// })

	// )
	// .then(function(j) {
	// 	console.log("AJHDSJADHKJDHASYIUAYSOS")
	// 	console.log(j)


	// 	var Data = j.map(function(myCategories) {



	// 		return {
	// 			name: myCategories.dataValues.name,
	// 			img: myCategories.dataValues.img,
	// 		}
	// 	})


		//var categorySpecs = Data;
		res.render('recipe', {
			thisRecipe: thisRecipe,
			//categorySpecs: categorySpecs
		});
	})

	//});
});

module.exports = router;
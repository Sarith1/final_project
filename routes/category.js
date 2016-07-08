var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var db = require('../models/database');
var pg = require('pg');
var Sequelize = require('sequelize');
var session = require('express-session');


router.get('/:categoryname', (req, res) => {
	console.log(req.params);
	var clickedCat = req.params.categoryname;

	db.recipe.findAll({
		where: {
			category: clickedCat
		}
	}).then(function(recipes) {
		var Data = recipes.map(function(myRecipes) {
			return {
				title: myRecipes.dataValues.title,
				ingredients: myRecipes.dataValues.ingredients,
				body: myRecipes.dataValues.body,
				rating: myRecipes.dataValues.rating,
				userId: myRecipes.dataValues.userId,
			}
		})
				console.log("VVVVVVV")

		var categoryRecipes = Data;
	

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
		res.render('category', {
			categoryRecipes: categoryRecipes,
			//categorySpecs: categorySpecs
		});
	})

	//});
});

module.exports = router;
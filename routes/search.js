var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize')
var db = require('../models/database')

router.post('/ajaxSearch', function(req, res){
	var storeRecipes = [];
	var searchTyping = req.body.searchTyping.toLowerCase()
	
	db.recipe.findAll({
	}).then(function(allrecipes) {
		// console.log('allcities ' + allcities)
		for(var i=0; i<allrecipes.length; i++ ){
			var recipeNames = allrecipes[i].name.toLowerCase();
			

			var inputRecipe = recipeNames.indexOf(searchTyping);
			

			if( inputRecipe != -1 ) {
				storeRecipes.push(allrecipes[i])
				//console.log('[i]' + allcities[i].name + allcities[i].country.name)
			}
			
		}res.send(storeRecipes)
	})
})

// ook ingredienten nog instellen


router.post('/', function(req, res){
	var searchTyping = req.body.searchTyping.toLowerCase()
	var recipe =[]

	db.recipe.findAll({
	}).then(function(allcities) {

		for(var i=0; i<allcities.length; i++ ){
			var cityNames = allcities[i].name.toLowerCase();
			var countryNames = allcities[i].country.name.toLowerCase();

			var inputCountry = countryNames.indexOf(searchTyping);
			var inputCity = cityNames.indexOf(searchTyping);

			if( searchTyping === cityNames || (searchTyping === cityNames + ' ' + countryNames) ) {
				console.log('scoooooreeeeeee ' + cityNames + ' ' + countryNames)
				// city.push(allcities[i])
				//res.send(allcities[i])
				res.render('citytip', {
					city: allcities[i]
				})
				return city
			} else if ( searchTyping === countryNames ){
				res.redirect('/city')
			}
		}
	})
	// .then(function(city){
	// 	console.log(city[0])
	// 		res.render('citytip', {
	// 			city: city[0]
	// 		})
	// 	})
})




module.exports = router;

var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var db = require('../models/database');

router.post('/ajaxSearch', function(req, res){
	var storeRecipes = [];
	var searchTyping = req.body.searchTyping.toLowerCase()
	
	db.recipe.findAll({
	}).then(function(allrecipes) {

		for(var i=0; i<allrecipes.length; i++ ){
			var recipeNames = allrecipes[i].name.toLowerCase();
			

			var inputRecipe = recipeNames.indexOf(searchTyping);
			

			if( inputRecipe != -1 ) {
				storeRecipes.push(allrecipes[i])
				
			}
			
		}res.send(storeRecipes)
	})
})




router.post('/', (req, res) =>{
	var searchTyping = req.body.searchTyping.toLowerCase()
	var recipe =[]

	db.recipe.findAll({
	}).then(function(allrecipes) {

		for(var i=0; i<allrecipes.length; i++ ){
			var recipeNames = allrecipes[i].title.toLowerCase();
			var ingredientNames = allrecipes[i].ingredients.toLowerCase();

			var inputRecipe = recipeNames.indexOf(searchTyping);
			var inputIngredient = ingredientNames.indexOf(searchTyping);

			if( searchTyping === recipeNames || (searchTyping === ingredientNames) ) {
				console.log('this is it' + recipeNames + ' ' + ingredientNames)

				res.render('recipe', {
					recipe: allrecipes[i]
				})
				return recipe
			} else if ( searchTyping === recipeNames ){
				res.redirect('/#')
			}
		}
	})
})




module.exports = router;

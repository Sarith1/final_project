var fireRequest = true;

$ ( document ).ready( function () {
	console.log('dom is ready')

	$ ( '#searching' ).on ( "keyup",function (){
		var inputLetters = {
			searchTyping: $ ('#searching') .val( )
		}
		$('#foundRecipes').empty()
			if(fireRequest) {
				fireRequest = false
				$.post ('search/ajaxSearch', inputLetters, function(data){

					for (recipe in data){
						//console.log(data[recipe].title)
						$ ( '#foundRecipes' ).append( '<div class="newRecipe">' + data[recipe].title + " " + 
							data[recipe].ingredients + '</div>' )
					}
					$ ( '.newRecipe' ) .click( function() { 
						$('#searching').val($(this).text()) 
						$('#foundRecipes').empty()
					})
				})
				setTimeout(function(){
					fireRequest = true
				}, 300)
			}

})
})
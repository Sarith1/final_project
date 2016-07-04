var fireRequest = true;

$ ( document ).ready( function () {
	console.log('dom is ready')

	$ ( '#searching' ).on ( "keyup",function (){
		var inputLetters = {
			searchTyping: $ ('#searching') .val( )
		}
		$('#foundPlaces').empty()
			if(fireRequest) {
				fireRequest = false
				$.post ('search/ajaxSearch', inputLetters, function(data){

					for (place in data){
						//console.log(data[place].name)
						$ ( '#foundPlaces' ).append( '<div class="newCity">' + data[place].name + " " + 
							data[place].country.name + '</div>' )
					}
					$ ( '.newCity' ) .click( function() { 
						$('#searching').val($(this).text()) 
						$('#foundPlaces').empty()
					})
				})
				setTimeout(function(){
					fireRequest = true
				}, 300)
			}

})
})
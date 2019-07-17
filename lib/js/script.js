$("#click").click(function(){
/*	$.ajax({
		url: 'https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1',
		data: {
			format: 'json'
		},
		error: function() {
			$('#info').html('<p>An error has occurred</p>');
		},
		dataType: 'jsonp',
		success: function(data) {
			console.log('teste')
		},
		type: 'GET'
	});*/
	html=''
	$.get( "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1").done(function( data ) {
		$.each(data['products'], function( index, value ) {
  			
		});
  	});
})
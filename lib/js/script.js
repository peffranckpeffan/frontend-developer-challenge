function makeXhttpRequest(method, url, async){
	var xhttp = new XMLHttpRequest();
	
	xhttp.open(method, url, async);
	xhttp.send()
	
	return xhttp
}

function createElement(element_type, appendTo, class_name, text='', background =''){
	var new_element = document.createElement(element_type)
	if (class_name != ''){
		new_element.classList.add(class_name)
	}
	new_element.innerText = text
	if (background != ''){
		new_element.style.backgroundImage = background
	}
	appendTo.appendChild(new_element)
	
	return new_element
}

function updateCard(page, buttonPlus){
	var getProd = makeXhttpRequest("GET", "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page="+page.toString(), true);

	getProd.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
		  	products = JSON.parse(this.responseText)['products']
		  	card_prod = document.getElementById('card')
		  	products.forEach(function(prod){
		  		prod_div = createElement('div', card_prod, 'product', '')
		  		createElement('div', prod_div, 'prod-img', '', 'url(https:'+prod['image']+')')
		  		createElement('p', prod_div, 'prod-name', prod['name'])
		  		createElement('p', prod_div, 'prod-description', prod['description'])
		  		createElement('p', prod_div, 'prod-price-from', 'De: R$'+ prod['oldPrice'])
		  		createElement('p', prod_div, 'prod-price-to', 'Por: R$'+ prod['price'])
		  		createElement('p', prod_div, 'prod-installment', 'ou '+prod['installments']['count']+'x de R$'+prod['installments']['value'])
		  		buy_button = createElement('p', prod_div, 'buy-now')
		  		createElement('a', buy_button, '', 'Comprar')
		  	});
		  	if (parseInt(page) >= 2){
		  		buttonPlus.setAttribute('page', parseInt(page)+1)
		  	}
	    }
	 };
}

updateCard('1', '')

var buttonPlus = document.getElementById('show-more')
buttonPlus.onclick = function(){
	updateCard(buttonPlus.getAttribute('page'), buttonPlus)	
}




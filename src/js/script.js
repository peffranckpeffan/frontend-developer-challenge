/**
	Returns the xhttp request for the URL passed.
*/
function makeXhttpRequest(method, url, async){
	var xhttp = new XMLHttpRequest();
	
	xhttp.open(method, url, async);
	xhttp.send()
	
	return xhttp
}

/**
	@desc creates a new HTML element in the component passed through appendTo
	@return the element created
*/
function createElement(element_type, appendTo, id='', class_name='', text='', background =''){
	var new_element = document.createElement(element_type)
	if (class_name != ''){
		new_element.id = id
	}
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

/**
	Update the product card with the data obtained through a request xhttp
*/
function updateCard(page, buttonPlus){
	var getProd = makeXhttpRequest("GET", "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page="+page.toString(), true);

	getProd.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
		  	products = JSON.parse(this.responseText)['products']
		  	card_prod = document.getElementById('card')
		  	products.forEach(function(prod){
		  		prod_div = createElement('div', card_prod, '', 'product', '')
		  		createElement('div', prod_div, '', 'prod-img', '', 'url(https:'+prod['image']+')')
		  		createElement('p', prod_div, '', 'prod-name', prod['name'])
		  		createElement('p', prod_div, '', 'prod-description', prod['description'])
		  		createElement('p', prod_div, '', 'prod-price-from', 'De: R$'+ prod['oldPrice'])
		  		createElement('p', prod_div, '', 'prod-price-to', 'Por: R$'+ prod['price'])
		  		createElement('p', prod_div, '', 'prod-installment', 'ou '+prod['installments']['count']+'x de R$'+prod['installments']['value'])
		  		buy_button = createElement('p', prod_div, '', 'buy-now')
		  		createElement('a', buy_button, '', '', 'Comprar')
		  	});

		  	//update the page attribute of the next xhttp request
		  	if (parseInt(page) >= 2){
		  		buttonPlus.setAttribute('page', parseInt(page)+1)
		  	}
	    }
	 };
}

/**
	Update index.html with the elements defined in the source layout
*/
function updateLayout(){
	var layouts = ['footer', 'header']
	layouts.forEach(function(layout){
		var element_to = document.getElementById(layout)
		getLayout = makeXhttpRequest('GET', 'src/layout/'+layout+'.html', true)
		getLayout.onreadystatechange = function() {
	    	if (this.readyState == 4 && this.status == 200) {
	    		element_to.innerHTML = this.responseText
	    	}
		}
	});
}

/**
	Validate the field e-mail from the form share
*/
function validateEmailShare(){
	form = document.getElementById("share-form")
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email.value)){
		return (true)
	}
	alert("You have entered an invalid email address!")
	return (false)
}

/**
	Show/Hide menu for devices with smaller screens
*/
function showMenu(display, overflow){
	document.getElementById('header-nav').style.display = display
	document.getElementById('overlay-nav').style.display = display
	document.body.style.overflow = overflow
}

/**
	Update index.html with elements from layout
*/
updateLayout()

/**
	Update the product card
*/
updateCard('1', '')
var buttonPlus = document.getElementById('show-more')
buttonPlus.onclick = function(){
	updateCard(buttonPlus.getAttribute('page'), buttonPlus)	
}

/**
	Events related to the hidden menu, avaible on devices with screens smaller than 820px
*/
document.getElementById('hidden-menu-icon').onclick = function(){
	showMenu('block', 'hidden')
}
document.getElementById('overlay-nav').onclick = function(){
	showMenu('none', 'auto')
}
/**
	Validate the field e-mail
*/
document.getElementById('send-email').onclick = function(){
	validateEmailShare()
}
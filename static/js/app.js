/**
 * Front-end test by WBC (web,buzz and communities)
 * v 1.0
 * by. r.elkhayat
 */

// Uncomment this if you are not familiar with ES6
/**
 * var searchProducts = searchProducts || function(prodcuts, params){
 * 	var result = [];
 * 	return result;
 * }
 */

/**
 * This function allows us to search products by multiple params
 * @param  {Array(Object)} prodcuts contains an array of product objects
 * @param  {Object} params
 * @return {Array} result
 */	
const searchProducts = (products, params) => {
	let result = [];
	let isOk
	for (var i = 0; i < products.length; i++) {
		//If one of the params is omitted, then it's passing the filter
		//else, we verify it 
		isOk = {
			name: params.name ? false: true,
			price: params.price ? false: true,
		}
		if (!isOk.price && products[i].price <= params.price) {
			isOk.price = true
		}
		if (!isOk.name && products[i].name.indexOf(params.name) > -1){
			isOk.name = true
		}
		if (isOk.name && isOk.price) {
			result.push(products[i])
		}
	}
	return result;
};

const onChange = event =>{
	let name = document.getElementById('name').value
	let price = document.getElementById('price').value

	const results = searchProducts(fixtures, { name, price })

	let tr, nameNode, priceNode
	//remove th old table
	let table = document.getElementById('table')
	table.remove()

	//create the new table
	table = document.createElement('table')
	table.id = 'table'
	//create the headers
	nameNode = document.createElement('th')
	nameText = document.createTextNode('name')
	nameNode.appendChild(nameText)
	
	priceNode = document.createElement('th')
	priceText = document.createTextNode('price')
	priceNode.appendChild(priceText)

	table.appendChild(nameNode)
	table.appendChild(priceNode)
	//display the table
	let app = document.getElementById('my-app')
	app.appendChild(table)

	//append the rows to the table
	let rows = results.forEach((item, index)=>{

		tr = document.createElement('tr')
		if (index % 2 === 1) {
			tr.className = 'alt'
		}
		nameNode = document.createElement('td')
		nameText = document.createTextNode(item.name)
		nameNode.appendChild(nameText)
		
		priceNode = document.createElement('td')
		priceText = document.createTextNode(item.price)
		priceNode.appendChild(priceText)

		tr.appendChild(nameNode)
		tr.appendChild(priceNode)

		table.appendChild(tr)		
	})

}

let nameInput = document.getElementById('name')
let priceInput = document.getElementById('price')

nameInput.oninput = onChange
priceInput.oninput = onChange

//fill the table for the first time
onChange()

/**
 * Rest of the application statements
 */
// e.g. document.getElementsByTagName("button")[0].onclick = (e) => { alert("clicked"); }
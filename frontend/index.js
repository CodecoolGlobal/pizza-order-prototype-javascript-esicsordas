const potionComponent = ({name, ingredients, period, price, allergens}) => `
	<div class="potions">
		<h2>${name}</h2>
		<h3>${ingredients}</h3>
		<h4>${period}</h4>
		<h5>${price}</h5>
		<h6>${allergens}</h6>
	</div>
`;

function getData (link, action){
    let fullUrl = `/api/${link}`;
    fetch(fullUrl)
        .then((response) => response.json())
        .then((data) =>{
				action (data);
		})
}

function displayData (data){
	let rootElement = document.getElementById("root");
	data.map(potion => {
		rootElement.insertAdjacentHTML("beforeend", potionComponent(potion))
	})
}

function makeAllergenList (data){
	console.log("allergének", data);
	let rootElement = document.getElementById("root");
	let createLIelement = document.createElement("li");
	
}

function main(){
	getData("potions", displayData);
	//getData("allergens", makeAllergenList);
}

main ();
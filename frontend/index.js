const potionComponent = ({name, ingredients, period, price, allergens}) => `
	<div class="potions">
		<h2>${name}</h2>
		<h3>${ingredients}</h3>
		<ul>${period}</ul>
		<h4>${price}</h4>
		<h5>${allergens}</h5>
	</div>
`;

function getData (type){
    let fullUrl = `http://localhost:3000/api/${type}`;
    fetch(fullUrl)
        .then((response) => response.json())
        .then((data) =>{
            test(data)});
}

function test (data){
	
	let rootElement = document.getElementById("root");
	data.map(potion => {
		rootElement.insertAdjacentHTML("beforeend", potionComponent(potion))
	})
}

getData("potions");



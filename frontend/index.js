const potionComponent = ({name, ingredients, period, price, allergens, img}) => `
	<div class="potions">
		<img scr=${img}>
		<h2>${name}</h2>
		<h3>${ingredients}</h3>
		<h4>${period}</h4>
		<h5>${price}</h5>
		<h6>${allergens}</h6>
	</div>
`;

function filterClickEvent (event, selectedAllergens){
	event.target.classList.toggle('checked');

	selectedAllergen = event.target.innerText

	if (!selectedAllergens.has(selectedAllergen)){
		selectedAllergens.add(selectedAllergen);
	}
	else if (selectedAllergens.has(selectedAllergen)){
			selectedAllergens.delete(selectedAllergen);
	}
	return selectedAllergens;
}

function filtering (set, data){
	let arrayIds = [];
	let array = [...set];
	let allergens = data;
	//console.log("array", array);
	for (let i = 0; i <data.length; i++){
		//console.log(data[i].name);
		array.filter(element => {
			if (element === data[i].name){
				arrayIds.push((data[i].id));
			}
		})
	}
	console.log("arrayIds", arrayIds);
	
}

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
	let rootElement = document.getElementById("root");
	let ulDiv = document.createElement("div");
	ulDiv.id = "ulDiv";

	let ul = document.createElement("ul");
	ul.id = "allergenek";


	let selectedAllergens = new Set();

		//allergdnek listcba raklsa
	for (let i = 0; i < data.length; i++){
		let newLI = document.createElement("li");
		newLI.innerText = data[i].name;
		newLI.addEventListener("click", (event) => {
			let set = filterClickEvent(event, selectedAllergens);
			filtering (set, data);
		})
		ul.appendChild(newLI);
	}
	ulDiv.appendChild(ul);
	rootElement.appendChild(ulDiv);

	//create style
	// Create a "close" button and append it to each list item
	let myNodelist = document.getElementsByTagName("LI");
	for (let i = 0; i < myNodelist.length; i++) {
		let span = document.createElement("SPAN");
	//llet txt = document.createTextNode("\u00D7");
		span.className = "close";
		//span.appendChild(txt);
		myNodelist[i].appendChild(span);
	}

	// Click on a close button to hide the current list item
	let  close = document.getElementsByClassName("close");
	for (let i = 0; i < close.length; i++) {
		close[i].onclick = function() {
			var div = this.parentElement;
			div.style.display = "none";
		}
	}
}

function isString(str) {
	return str.toUpperCase() !== str.toLowerCase();
}

function main(){
	getData("potions", displayData);
	getData("allergens", makeAllergenList);
}

main ();
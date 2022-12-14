const potionComponent = ({name, ingredients, period, price, allergens}) => `
	<div class="potions">
		<h2>${name}</h2>
		<h3>${ingredients}</h3>
		<h4>${period}</h4>
		<h5>${price}</h5>
		<h6>${allergens}</h6>
	</div>
`;

function filterClickEvent (event, selectedAllergens){
	console.log(event.target.innerText);
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
			filterClickEvent(event, selectedAllergens);
			console.log(selectedAllergens);
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
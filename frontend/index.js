const potionComponent = ({name, ingredients, period, price, allergens}) => `
	<div class="potions">
		<h2>${name}</h2>
		<h3>${ingredients}</h3>
		<h4>${period}</h4>
		<h5>${price}</h5>
		<h6>${allergens}</h6>
	</div>
`;

function filterClickEvent (event){
	if (event.target.tagName === "LI"){
		event.target.classList.toggle('checked');
		return event.target.innerText;
	} 
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
	let ul = document.createElement("ul");
	ul.id = "allergens";
		//allergdnek listcba raklsa
	for (let i = 0; i < data.length; i++){
		let newLI = document.createElement("li");
		newLI.innerText = data[i].name;
		ul.appendChild(newLI);
	}
	rootElement.appendChild(ul);

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
	let selectedAllergens = new Set();
	window.addEventListener("click", event  => {
		//allergének kezelése
		let selectedAllergen;
			//allergén ellenőrzése, hogy string-e
		if (isString(filterClickEvent(event))){
			selectedAllergen = filterClickEvent(event);
		}
			//allergén ellenőrzése, hogy benne van-e már a set-ben
		if (selectedAllergens.has(selectedAllergen)){
			selectedAllergens.delete(selectedAllergen);
		} else if (!selectedAllergens.has(selectedAllergen)){
			selectedAllergens.add(selectedAllergen);
		}
		console.log(selectedAllergens);
	})
}

main ();
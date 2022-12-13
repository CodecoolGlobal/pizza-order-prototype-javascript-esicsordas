const potionComponent = ({name, ingredients, period, price, allergens}) => `
	<div class="potions">
		<h2>${name}</h2>
		<h3>${ingredients}</h3>
		<h4>${period}</h4>
		<h5>${price}</h5>
		<h6>${allergens}</h6>
	</div>
`;

const clickEvent = event => {
	console.log(event.target);
}

function getData (link, action){
    let fullUrl = `http://localhost:3000/api/${link}`;
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
		//allergének listába rakása
	for (let i = 0; i < data.length; i++){
		let newLI = document.createElement("li");
		newLI.innerText = data[i].name;
		ul.appendChild(newLI);
	}
	rootElement.appendChild(ul);

	// Create a "close" button and append it to each list item
	let myNodelist = document.getElementsByTagName("LI");
	for (let i = 0; i < myNodelist.length; i++) {
		let span = document.createElement("SPAN");
		let txt = document.createTextNode("\u00D7");
		span.className = "close";
		span.appendChild(txt);
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

function main(){
	getData("potions", displayData);
	getData("allergens", makeAllergenList);
	window.addEventListener("click", clickEvent)
}

main ();
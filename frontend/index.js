function potionComponent({ id, name, ingredients, period, price }) {
	return `
	<div id ="${id}" class="potions">
		<h2>${name}</h2>
		<h3>${ingredients}</h3>
		<h4>${period}</h4>
		<h5>${price}</h5><br><br>
		<input type="number" min="0" id ="amount${id}" value= "0" class="amount" >
		<button id ="button${id}">Add to order</button><br><br>
	</div>
	`
};

function addPicture(id) {
	let div = document.getElementById(`${id}`);
	let pic = document.createElement('img');
	pic.classList.add('picture');
	pic.src = `images/pic${id}.jpg`;
	div.appendChild(pic);
}

function filterClickEvent(event, selectedAllergens) {
	event.target.classList.toggle('checked');
	selectedAllergen = event.target.innerText
	if (!selectedAllergens.has(selectedAllergen)) {
		selectedAllergens.add(selectedAllergen);
	}
	else if (selectedAllergens.has(selectedAllergen)) {
		selectedAllergens.delete(selectedAllergen);
	}
	return selectedAllergens;
}

function filtering(set, data) {
	let arrayIds = [];
	let array = [...set];
	for (let i = 0; i < data.length; i++) {
		//console.log(data[i].name);
		array.filter(element => {
			if (element === data[i].name) {
				arrayIds.push((data[i].id));
			}
		})
	}
	fetch("api/potions")
		.then((response) => response.json())
		.then((data) => {
			for (let i = 0; i < data.length; i++) {
				let chosenPotion = document.getElementById(`${data[i].id}`);
				chosenPotion.classList.remove('chosen')
				data[i].allergens.filter(item => arrayIds.includes(item) ? addClasslistToElements(data[i].id) : null)
			}
		})
}

function addClasslistToElements(id) {
	let chosenPotion = document.getElementById(`${id}`);
	chosenPotion.classList.add('chosen')

}


function getData(link, action) {
	let fullUrl = `/api/${link}`;
	fetch(fullUrl)
		.then((response) => response.json())
		.then((data) => {
			action(data);
		})
}

function displayData(data) {
	let rootElement = document.getElementById("root");
	data.map(potion => {
		rootElement.insertAdjacentHTML("beforeend", potionComponent(potion))
		addPicture(potion.id);
	})
}

function makeAllergenList(data) {
	let rootElement = document.getElementById("root");
	let ulDiv = document.createElement("div");
	ulDiv.id = "ulDiv";
	let ul = document.createElement("ul");
	ul.id = "allergenek";
	let selectedAllergens = new Set();
	//allergdnek listcba raklsa
	for (let i = 0; i < data.length; i++) {
		let newLI = document.createElement("li");
		newLI.innerText = data[i].name;
		newLI.addEventListener("click", (event) => {
			let set = filterClickEvent(event, selectedAllergens);
			filtering(set, data);
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
	let close = document.getElementsByClassName("close");
	for (let i = 0; i < close.length; i++) {
		close[i].onclick = function () {
			var div = this.parentElement;
			div.style.display = "none";
		}
	}
}

function createHead() {
	let rootElement = document.getElementById("root");
	let headDiv = document.createElement('div');
	headDiv.id = "headdiv";
	headDiv.classList.add("headerelement")
	let headPic = document.createElement('img');
	headPic.src = `images/BET potions.png`;
	headDiv.appendChild(headPic);
	let parent = headDiv.parentNode;
	document.body.insertBefore(headDiv, document.body.firstChild);
}

function main() {
	createHead();
	getData("potions", displayData);
	getData("allergens", makeAllergenList);
	createOrderform()
	addToOrder();
}

function addToOrder() {
	let orders = {};
	orders.potions = [];
	let customerCounter = 1;

	window.addEventListener("click", (event) => {
		if (event.target.innerText === "Add to order") {
			const kattId = event.target.id.slice(-1);
			const amountInput = document.getElementById(`amount${kattId}`);
			orders.potions.push({ 'id': kattId, 'amount': amountInput.value });
		}
		if (event.target.innerText === "Submit") {
			orders.id = customerCounter;
			const today = new Date()
			orders.date = {}
			orders.date.year = `${today.getFullYear()}`;
			orders.date.month = `${today.getMonth() + 1}`;
			orders.date.day = `${today.getDate()}`;
			orders.date.hour = `${today.getHours()}`;
			orders.date.minute = `${today.getMinutes()}`
			customerCounter += 1;
			console.log(orders);
		}
	})
}

function createOrderform() {
	let headDiv = document.getElementById("headdiv");
	const submitButton = document.createElement('button');
	submitButton.innerText = "Submit"
	headDiv.insertAdjacentHTML("beforeend", formComponent())
	headDiv.appendChild(submitButton)
}

function formComponent () {
	return `<form>
	<label for="fname">Name:</label><br>
	<input type="text" id="fname" class="form"><br>
	<label for="lname">Email:</label><br>
	<input type="text" id="email" class="form"><br>
	<label for="lname">City:</label><br>
	<input type="text" id="city" class="form"><br>
	<label for="lname">Address:</label><br>
	<input type="text" id="address" class="form">
  </form>`
}

main();
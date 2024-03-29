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
	let headDiv = document.getElementById("headdiv");
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
	let form = document.getElementById("form");
	headDiv.insertBefore(ulDiv, form);

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
	systemBossButton();
}

function systemBossButton(){
	let bossButton = document.createElement('button');
	bossButton.innerText = "BossButton";
	document.body.appendChild(bossButton);
	bossButton.onclick = function () {
        location.href = "http://localhost:3000/api/order";
    };

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
			amountInput.value = 0;
			//console.log(event.target.innerText);
		}
		if (event.target.innerText === "Submit") {
			const fname = document.getElementById("fname");
			const femail = document.getElementById("femail");
			const fcity = document.getElementById("fcity");
			const faddress = document.getElementById("faddress");
			const today = new Date();

			orders.id = customerCounter;
			orders.date = {};
			orders.date.year = `${today.getFullYear()}`;
			orders.date.month = `${today.getMonth() + 1}`;
			orders.date.day = `${today.getDate()}`;
			orders.date.hour = `${today.getHours()}`;
			orders.date.minute = `${today.getMinutes()}`;
			orders.customer ={};
			orders.customer.name = fname.value;
			orders.customer.email = femail.value;
			orders.customer.address = {};
			orders.customer.address.city = fcity.value;
			orders.customer.address.street = faddress.value;
			sendToBackend(orders);
			customerCounter += 1;
			fname.value = '';
			femail.value='';
			fcity.value='';
			faddress.value='';
		}
	})
}

function sendToBackend (object) {
	//let data = new FormData();
	let dataToSend = JSON.stringify(object);
		fetch("/api/order",{
			credentials: "same-origin",
			mode: "same-origin",
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: dataToSend
	})
	.catch(function (error) {
	console.log('Request failed', error);
	})
    .then(function (data) {
    console.log('Request succeeded with JSON response', data);
    });
}

function createOrderform() {
	let headDiv = document.getElementById("headdiv");
	const submitButton = document.createElement('button');
	submitButton.innerText = "Submit"
	submitButton.classList.add('submit')
	headDiv.insertAdjacentHTML("beforeend", formComponent());
	let form = document.getElementById("form");
	form.appendChild(submitButton)
}

function formComponent () {
	return `<form id="form" action="javascript:void(0);">
	<label class='label' for="fname">Name:</label><br>
	<input type="text" id="fname" class="form"><br>
	<label class='label'for="lname">Email:</label><br>
	<input type="text" id="femail" class="form"><br>
	<label class='label' for="lname">City:</label><br>
	<input type="text" id="fcity" class="form"><br>
	<label class='label' for="lname">Address:</label><br>
	<input type="text" id="faddress" class="form"><br><br>
  </form>`
}

main();
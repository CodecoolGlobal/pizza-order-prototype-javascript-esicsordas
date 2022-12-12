const potionComponent = ({name, ingredients, period, price, allergens}) => `
	<div class="potions">
		<h2>${name}</h2>
		<h3>${ingredients}</h3>
		<ul>${period}</ul>
		<h4>${price}</h4>
		<h5>${allergens}</h5>
	</div>
`;
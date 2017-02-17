'use strict';

function loadSingleCarData() {
	var car = JSON.parse(sessionStorage.getItem('car'));
	console.log(car);
    var carBlock = document.getElementById('car-block');
    var carNode = getCarBlockNode(car, 0);
    carBlock.appendChild(carNode);
}
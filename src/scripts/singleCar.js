'use strict';

// create the root namespace and making sure we're not overwriting it
var SingleCarModule = SingleCarModule || {};

SingleCarModule.loadSingleCarData = function() {
    var car = JSON.parse(sessionStorage.getItem('car'));
    var carBlock = document.getElementById('car-block');
    var carNode = getSingleCarBlockNode(car, 0);
    carBlock.appendChild(carNode);	
};

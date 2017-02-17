'use strict';

// create the root namespace and making sure we're not overwriting it
var MainCarModule = MainCarModule || {};

// car constructor
function Car(vehicleObj, vendor) {
    this.src = vehicleObj['Vehicle']['PictureURL'];
    this.Vendor = vendor;
    this.Make = vehicleObj['Vehicle']['VehMakeModel']['@Name'];
    this.BaggageQuantity = vehicleObj['Vehicle']['@BaggageQuantity'];
    this.PassengerQuantity = vehicleObj['Vehicle']['@PassengerQuantity'];
    this.DoorCount = vehicleObj['Vehicle']['@DoorCount'];
    this.AirConditionInd = vehicleObj['Vehicle']['@AirConditionInd'];
    this.TransmissionType = vehicleObj['Vehicle']['@TransmissionType'];
    this.FuelType = vehicleObj['Vehicle']['@FuelType'];
    this.DriveType = vehicleObj['Vehicle']['@DriveType'];
    this.TotalPrice = vehicleObj['TotalCharge']['@RateTotalAmount'];
    this.Currency = vehicleObj['TotalCharge']['@CurrencyCode'];
}

function getSingleCarBlockNode(car, index) {
    var mainDiv = document.createElement('div');
    mainDiv.setAttribute('class', 'flex-item');
    mainDiv.setAttribute('data-index', index);

    Object.keys(car).forEach(function(key) {
        if (key === 'src') {
            var img = document.createElement('img');
            img.src = car.src;
            img.alt = "img not available";
            img.setAttribute('class', 'thumbnail');
            mainDiv.appendChild(img);
        } else {
            var p = document.createElement('p');
            p.innerHTML = key.replace(/([a-z])([A-Z])/g, '$1 $2') + ': ' + car[key];
            mainDiv.appendChild(p);
        }
    });

    return mainDiv;
};

function acendingSortCarsByPrice(carA, carB) {
    return carA.TotalPrice - carB.TotalPrice;
}

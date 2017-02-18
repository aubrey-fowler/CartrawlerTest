'use strict';

// create the root namespace and making sure we're not overwriting it
var MainCarModule = MainCarModule || {};

// Car constructor
MainCarModule.Car = function(vehicleObj, vendor) {
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

};

/*
 * could not make this a part of the Car class because when we stringify/de-stringify prototypes and
 * functions are lost
 */
MainCarModule.getSingleCarBlockNode = function(car, index) {
  var mainDiv = document.createElement('div');
    mainDiv.setAttribute('class', 'flex-item');
    mainDiv.setAttribute('data-index', index);

    var subDiv = document.createElement('div');
    subDiv.setAttribute('class', 'container');

    var imgDiv = document.createElement('div');
    imgDiv.appendChild(this.getImgNode(car.src));
    subDiv.appendChild(imgDiv);

    // 3 more columns
    subDiv.appendChild(document.createElement('div'));
    subDiv.appendChild(document.createElement('div'));
    subDiv.appendChild(document.createElement('div'));

    var keys = Object.keys(car); //array of keys in car object
    for (var i = 1; i < keys.length; i++) {
        var currentKey = keys[i];
        if (car.hasOwnProperty(currentKey)) {
            var p = document.createElement('p');
            p.innerHTML = currentKey.replace(/([a-z])([A-Z])/g, '$1 $2') + ': ' + car[currentKey];
            var div = subDiv.getElementsByTagName("div");
            for (var j = 3; j > 0; j--) {
                if (div[j].childNodes.length < 4 ) {
                    div[j].appendChild(p);
                }
            }
        } 
    }

    mainDiv.appendChild(subDiv);

    return mainDiv;
}

MainCarModule.getImgNode = function(src) {
    var img = document.createElement('img');
    img.src = src;
    img.alt = "img not available";
    img.setAttribute('class', 'thumbnail');
    return img;  
};

MainCarModule.ascendingSortCarsByPrice = function(carA, carB) {
    return carA.TotalPrice - carB.TotalPrice;
};

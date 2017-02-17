'use strict';

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "./src/cars.json", true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonObj = JSON.parse(this.responseText);
            populateLegend(jsonObj[0]['VehAvailRSCore']['VehRentalCore']);
            var cars = getCarList(jsonObj[0]['VehAvailRSCore']['VehVendorAvails']);
            console.log('cars: ', cars);
            populateCarBlocks(cars);
        }
    };
}

function populateLegend(jsonHeaderObj) {
    document.getElementById("pick-up-location").innerHTML = jsonHeaderObj['PickUpLocation']['@Name'];
    document.getElementById("pick-up-time").innerHTML = jsonHeaderObj['@PickUpDateTime'];
    document.getElementById("drop-off-location").innerHTML = jsonHeaderObj['ReturnLocation']['@Name'];
    document.getElementById("drop-off-time").innerHTML = jsonHeaderObj['@ReturnDateTime'];
}

function getCarList(jsonVedorsObj) {
    console.log(jsonVedorsObj);

    var carList = [];

    for (var i = 0; i < jsonVedorsObj.length; i++) {
        var vendor = jsonVedorsObj[i]['Vendor']['@Name'];
        for (var j = 0; j < jsonVedorsObj[i]['VehAvails'].length; j++) {
            carList.push(new Car(jsonVedorsObj[i]['VehAvails'][j], vendor));
        }
    }

    return carList;
}
   
var Car = function (vehicleObj, vendor) {
    console.log(vehicleObj);
    this.vendor = vendor;
    this.make = vehicleObj['Vehicle']['VehMakeModel']['@Name'];
    this.src = vehicleObj['Vehicle']['PictureURL'];
    this.BaggageQuantity = vehicleObj['Vehicle']['BaggageQuantity'];
    this.PassengerQuantity = vehicleObj['Vehicle']['PassengerQuantity'];
    this.DoorCount = vehicleObj['Vehicle']['DoorCount'];
    this.AirConditionInd = vehicleObj['Vehicle']['AirConditionInd'];
    this.TransmissionType = vehicleObj['Vehicle']['TransmissionType'];
    this.FuelType = vehicleObj['Vehicle']['FuelType'];
    this.DriveType = vehicleObj['Vehicle']['DriveType'];
    this.TotalPrice = vehicleObj['TotalCharge']['@RateTotalAmount'];
    this.CurrencyCode = vehicleObj['TotalCharge']['@CurrencyCode'];
}

function getCarBlock(car) {
    var mainDiv = document.createElement('div');
    mainDiv.setAttribute('class', 'flex-item');

    var img = document.createElement('img');
    img.src = car.src;

    mainDiv.appendChild(img);

    return mainDiv;
}

function populateCarBlocks(cars) {
    var d = document.getElementById('car-block');
    for (var i = 0; i < cars.length; i++) {
        d.appendChild(getCarBlock(cars[i]));
    }
}
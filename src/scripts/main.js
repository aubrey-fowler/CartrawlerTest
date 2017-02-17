'use strict';

function loadCarData() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "./src/cars.json", true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200 && this.responseText != null) {
            var jsonObj = JSON.parse(this.responseText)[0]['VehAvailRSCore'];
            processResponse(jsonObj);
        }
    };
}

function processResponse(jsonObj) {
    populateLegend(jsonObj['VehRentalCore']);
    var cars = getCarList(jsonObj['VehVendorAvails']).sort(acendingSortCarsByPrice);

    console.log('cars: ', cars);
    populateCarBlocks(cars);

    var carBlock = document.getElementById('car-block');
    carBlock.addEventListener('click', function (event) {
        var carIndex = parseInt(event.target.getAttribute('data-index'), 10);
        if (!isNaN(carIndex)) {
   
            var span = document.createElement('span');
            span.setAttribute('class', 'close');
            span.innerHTML = '&times';
            span.onclick = closeModal;

            var modal = document.getElementById('carModal');
            var carBlock = getCarBlock(cars[carIndex], carIndex);
            carBlock.insertBefore(span, carBlock.firstChild);

            modal.appendChild(carBlock);
            modal.style.display = "block";

            window.onclick = function(event) {
                if (event.target == modal) {
                    closeModal();
                }
            }
        }
    });
}

function closeModal() {
    var modal = document.getElementById('carModal');
    modal.style.display = "none";
    while(modal.hasChildNodes()) {
        modal.removeChild(modal.lastChild);
    }
}

function populateLegend(jsonHeaderObj) {
    document.getElementById("pick-up-location").innerHTML = jsonHeaderObj['PickUpLocation']['@Name'];
    document.getElementById("pick-up-time").innerHTML = jsonHeaderObj['@PickUpDateTime'];
    document.getElementById("drop-off-location").innerHTML = jsonHeaderObj['ReturnLocation']['@Name'];
    document.getElementById("drop-off-time").innerHTML = jsonHeaderObj['@ReturnDateTime'];
}

function getCarList(jsonVedorsObj) {
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
    this.Vendor = vendor;
    this.Make = vehicleObj['Vehicle']['VehMakeModel']['@Name'];
    this.src = vehicleObj['Vehicle']['PictureURL'];
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

function acendingSortCarsByPrice(carA, carB) {
    return carA.TotalPrice - carB.TotalPrice;
}

function getCarBlock(car, index) {
    var mainDiv = document.createElement('div');
    mainDiv.setAttribute('class', 'flex-item');
    mainDiv.setAttribute('data-index', index);

    Object.keys(car).forEach(function(key) {
        if (key === 'src') {
            var img = document.createElement('img');
            img.src = car.src;
            img.alt = "img not available";
            mainDiv.appendChild(img);
        } else {
            var p = document.createElement('p');
            p.innerHTML = key + ': ' + car[key];
            mainDiv.appendChild(p);
        }
    });

    return mainDiv;
}

function populateCarBlocks(cars) {
    var carBlock = document.getElementById('car-block');

    for (var i = 0; i < cars.length; i++) {
        carBlock.appendChild(getCarBlock(cars[i], i));
    }
}
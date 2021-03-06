'use strict';

// create the root namespace and making sure we're not overwriting it
var MainAppModule = MainAppModule || {};

//public function - starting point for app
MainAppModule.loadCarData = function() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "./src/data/cars.json", true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200 && this.responseText != null) {
            processResponse(JSON.parse(this.responseText)[0]['VehAvailRSCore']);
        }
    };

    /* private functions */
    function processResponse(jsonObj) {
        populateLegendNode(jsonObj['VehRentalCore']);

        var cars = getCarList(jsonObj['VehVendorAvails']).sort(MainCarModule.ascendingSortCarsByPrice);
        populateCarBlockListNode(cars);

        var carBlocks = document.getElementsByClassName('flex-item');
        for(var i = 0; i < carBlocks.length; i++) {
            carBlocks[i].onclick = onCarClick;
        }

        // on car block click handler
        function onCarClick(event) {
            var carIndex = parseInt(this.getAttribute('data-index'), 10);

            if (!isNaN(carIndex)) {
                if (typeof(Storage) !== "undefined") {
                    sessionStorage.setItem("car", JSON.stringify(cars[carIndex]));
                    window.open("../singleCar.html", "_blank");
                } else {
                    alert('Sorry! No Web Storage support...');
                }
            }
        };
    }

    function populateLegendNode(jsonHeaderObj) {
        document.getElementById("pick-up-location").innerHTML = jsonHeaderObj['PickUpLocation']['@Name'];
        document.getElementById("drop-off-location").innerHTML = jsonHeaderObj['ReturnLocation']['@Name'];

        var pickUpDate = new Date(jsonHeaderObj['@PickUpDateTime']);
        var returnDate = new Date(jsonHeaderObj['@ReturnDateTime']);

        document.getElementById("pick-up-time").innerHTML = pickUpDate.toUTCString();
        document.getElementById("drop-off-time").innerHTML = returnDate.toUTCString();
    }

    function getCarList(jsonVedorsObj) {
        var carList = [];

        for (var i = 0; i < jsonVedorsObj.length; i++) {
            var vendor = jsonVedorsObj[i]['Vendor']['@Name'];
            for (var j = 0; j < jsonVedorsObj[i]['VehAvails'].length; j++) {
                carList.push(new MainCarModule.Car(jsonVedorsObj[i]['VehAvails'][j], vendor));
            }
        }

        return carList;
    }
       
    function populateCarBlockListNode(cars) {
        var carBlock = document.getElementById('car-block');

        for (var i = 0; i < cars.length; i++) {
            carBlock.appendChild(MainCarModule.getSingleCarBlockNode(cars[i], i));
        }
    }
};
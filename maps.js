var maps = [
	{
		'map_canvas_id': 'map-canvas-1',
		'directions_display': new google.maps.DirectionsRenderer(),
    },
	{
		'map_canvas_id': 'map-canvas-2',
		'directions_display': new google.maps.DirectionsRenderer()
   	},
	{
		'map_canvas_id': 'map-canvas-3',
		'directions_display': new google.maps.DirectionsRenderer()
    }
];

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initialize(map_obj) {
  var sydney = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom:8,
    center: sydney
  }
  map = new google.maps.Map(document.getElementById(map_obj.map_canvas_id), mapOptions);
  map_obj.directions_display.setMap(map);
  //directionsDisplay.setPanel(document.getElementById("directionsPanel"));
}

function calcRoute(map_objects, source, destination) {
  var request = {
    origin:source,
    destination:destination,
	provideRouteAlternatives: true,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
		for (var i = 0; i < response.routes.length; i++){
			map_objects[i].directions_display.setDirections(response);
		}
	  console.log(response);
    }
  });
}

function calculateDistances(source, destination) {
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: source,
            destinations: destination,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
        }, callback);
}

function callback(response, status) {
    if (status != google.maps.DistanceMatrixStatus.OK) {
        alert('Error was: ' + status);
    } else {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
        var outputDiv1 = document.getElementById('outputDiv1');
        outputDiv1.innerHTML = '';

        for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
                outputDiv1.innerHTML += results[j].distance.text + ' in '
                    + results[j].duration.text + '<br>';
            }
        }
        console.log(response);
    }
}


/*
var map_canvas = document.getElementById("map-canvas");

var mapOptions = {
  center: new google.maps.LatLng(-34.397, 150.644),
  zoom: 8
};

var map = new google.maps.Map(map_canvas, mapOptions);
*/

initialize(maps[0]);
initialize(maps[1]);
initialize(maps[2]);

var go_btn_clicked = function(){
    var src = $("#source-textbox").val();
    var dst =  $("#destination-textbox").val();
	$("div").show();
	initialize(maps[0]);
	initialize(maps[1]);
	initialize(maps[2]);
	calcRoute(maps, src, dst);

    var distance_btn_clicked = function(){
        calculateDistances(src, dst);
    };

    $("#distance-btn-1").click(distance_btn_clicked);
};

$("#go-btn").click(go_btn_clicked);



























var parameters = {
	'name': 'Mr Smith',
	'duration': 5
};

$.post("http://www.engineering.unsw.edu.au/civil-engineering/staff/saveUserResponse", parameters, function(){
	alert('Data sent');
});


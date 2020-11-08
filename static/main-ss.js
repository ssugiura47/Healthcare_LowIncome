// Creating map object
var myMap = L.map("mapid", {
    center: [38.5816, -121.4944],
    zoom: 7
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);



// d3.json("http://127.0.0.1:5000/").then(function (data) {

// });

var scrape_ca_counties = "http://127.0.0.1:5000/ca_counties"
d3.json(scrape_ca_counties, function(ca_counties) {
  //Creating a GeoJSON layer with the retrieved data
  // L.geoJson(ca_counties).addTo(myMap);
  // // Create a new marker cluster group
  // var markers = L.markerClusterGroup();
  // // Loop through data
  // for (var i = 0; i < ca_counties.length; i++) {

  //   // Set the data location property to a variable
  //   var location = ca_counties[0]
  //   console.log(location)
    // // Check for location property
    // if (location) {

    //   // Add a new marker to the cluster group and bind a pop-up
    //   markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
    //     .bindPopup(response[i].descriptor));
    // };

  // }
});

var scrape_medical_county = "http://127.0.0.1:5000/medical_county"
d3.json(scrape_medical_county, function (medical_co) {
  // Create a new marker cluster group
  var markers = L.markerClusterGroup();
  // Loop through data
  for (var i = 0; i < medical_co.length; i++) {

  // Set the data location property to a variable
  var serviceProvider = medical_co[i].Provider;
  var services = medical_co[i].Services;
  var latitude = medical_co[i].Latitute;
  var longitude = medical_co[i].Longitude;
  var object = medical_co[i];
    console.log(object)
  // Check for location property
  if (latitude && longitude) {
    // console.log(latitude, longitude)
    // Add a new marker to the cluster group and bind a pop-up
    markers.addLayer(L.marker([latitude, longitude])
      .bindPopup("<h1>" + serviceProvider + "</h1> <hr> <h3>Services: " + services + "</h3>"));
    };
  };
  myMap.addLayer(markers);
});

var scrape_medically_underserved = "http://127.0.0.1:5000/medically_underserved"
d3.json(scrape_medically_underserved, function (underserved) {
  L.geoJson(underserved).addTo(myMap);

});

// d3.json("http://127.0.0.1:5000/low_income_ca").then(function (data) {

// });

// d3.json("http://127.0.0.1:5000/low_income_race").then(function (data) {

// });

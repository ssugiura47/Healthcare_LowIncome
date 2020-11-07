// Creating map object
var myMap = L.map("mapid", {
    center: [38.5816, -121.4944],
    zoom: 6
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

// d3.json("http://127.0.0.1:5000/ca_counties").then(function (data) {


// });

// d3.json("http://127.0.0.1:5000/medical_county").then(function (data) {

// });

// d3.json("http://127.0.0.1:5000/medically_underserved").then(function (data) {

// });

// d3.json("http://127.0.0.1:5000/low_income_ca").then(function (data) {

// });

// d3.json("http://127.0.0.1:5000/low_income_race").then(function (data) {

// });

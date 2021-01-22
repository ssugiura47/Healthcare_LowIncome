// Creating map object
var myMap = L.map("mapid", {
    center: [38.5816, -121.4944],
    zoom: 6
  });
  
// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Adding special icon for health service
var hospitalIcon = L.icon({
  iconUrl: 'static/hospital.svg',
  iconSize:     [25, 50], // size of the icon
  iconAnchor:   [24, 34], // point of the icon which will correspond to marker's location
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// creating variables for api
var scrape_medical_county = "http://127.0.0.1:5000/medical_county"
var scrape_medically_underserved = "http://127.0.0.1:5000/medically_underserved"
var scrape_low_income_ca = "http://127.0.0.1:5000/low_income_ca"

d3.json(scrape_medical_county, function(medical_co) {
  // Create a new marker cluster group
  var markers = L.markerClusterGroup();
  // Loop through data
  medical_co.forEach(function(data){
      // Set the data location property to a variable
      var serviceProvider = data[i].Provider;
      var services = data[i].Services;
      // console.log(services)
      var latitude = data[i].Latitute;
      var longitude = data[i].Longitude;
    console.log(latitude)
    // // Check for location property
    //   if (latitude && longitude) {
    //     if (services == 'Health Services'){
    //       markers.addLayer(
    //       L.marker([latitude, longitude], {icon: hospitalIcon}).addTo(myMap).bindPopup("Health Service"));
    //     };
    //     else {
    //       // Add a new marker to the cluster group and bind a pop-up
    //       markers.addLayer(L.marker([latitude, longitude])
    //         .bindPopup("<h1>" + serviceProvider + "</h1> <hr> <h3>Services: " + services + "</h3>"));
    //     };
    //   };
    // };
  myMap.addLayer(markers);
});


// d3.json(scrape_medically_underserved, function(underserved) {
//   L.geoJson(underserved).addTo(myMap);
// });

// var scrape_low_income_race = "http://127.0.0.1:5000/low_income_race"
// function buildPlot2() {
//   d3.json(scrape_low_income_race, function (race_data) {
//     var race = []
//     var percent_race = []

//     race_data.forEach(function(r_data){
//       race.push(r_data[i].race)
//       percent_race.push(r_data[i].percent_of_families_below_the_living_wage)
//     }
    
//     var trace2 = {
//       type: "bar",
//       x: race,
//       y: percent_race,
//       name: 'AIAN: American Indian or Alaska Native; NHOPI: Native Hawaiian or Other Pacific Islander'
//   }

//     var layout2 = {
//       title: "Percent of Families Living Below the Living Wage in California by Race",
//       yaxis: {title: "Percent (%)"},
//       showlegend : true, 
//       legend: { xanchor: 'center', x: 0.5, orientation: 'h' } 
//     }

//     Plotly.newPlot("bar2", [trace2], layout2);

//   });
// }


// function buildPlot() {
//   d3.json(scrape_low_income_ca, function(ca_data) {
//     // Grab values from the data json object to build the plots
//     var data = ca_data;
//     data.sort(function(a, b) {
//       return b.percent_of_families_below_the_living_wage - a.percent_of_families_below_the_living_wage;
//     });
    
//     var family = []
//     var county = []

//     ca_data.forEach(function(c_data){
//       family.push(c_data[i].percent_of_families_below_the_living_wage);
//       county.push(c_data[i].county)
//       };

//       transform = [{
//         type: 'sort',
//         target: family,
//         order: 'descending'
//       }];

//       var trace1 = {
//         type: "bar",
//         x: county,
//         y: family,
//         name :"CA Counties"
//       };
      
//       var layout = {
//         title: "Percent of Families Living Below the Living Wage in California Counties",
//         yaxis: {title: "Percent (%)"},
//         showlegend : true
//       };

//     Plotly.newPlot("bar", [trace1], layout, transform);

//     });
// };

// buildPlot2()
// buildPlot()
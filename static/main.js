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


var scrape_medical_county = "http://127.0.0.1:5000/medical_county"
d3.json(scrape_medical_county, function(medical_co) {
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

    // Check for location property
    if (latitude && longitude) {
      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([latitude, longitude])
        .bindPopup("<h1>" + serviceProvider + "</h1> <hr> <h3>Services: " + services + "</h3>"));
      };
  };
  myMap.addLayer(markers);
});

var scrape_medically_underserved = "http://127.0.0.1:5000/medically_underserved"
d3.json(scrape_medically_underserved, function(underserved) {
  L.geoJson(underserved).addTo(myMap);
});

// d3.json("http://127.0.0.1:5000/low_income_ca").then(function (data) {

// });

var scrape_low_income_race = "http://127.0.0.1:5000/low_income_race"
function buildPlot2() {
  d3.json(scrape_low_income_race, function (race_data) {
    var race = []
    var  sumnumfam = 0
    var sumfam = 0

    for (var i = 0; i < race_data.length; i++) {
      race.push(race_data[i].race)
      sumnumfam =+ race_data[i].number_of_families
      sumfam =+ race_data[i].families_below_the_living_wage
    }

    console.log(race)
    console.log(sumfam)
    console.log(sumnumfam)

    var trace2 = {
      type: "bar",
      x: race,
      y: (sumfam/sumnumfam*100)
  }
    var layout2 = {
      title: "Percent of Families Living Below the Living Wage in California by Race",
      yaxis: {title: "Percent (%)"}
    }

    Plotly.newPlot("bar2", [trace2], layout2);

  });

}
buildPlot2()


var scrape_low_income_ca = "http://127.0.0.1:5000/low_income_ca"
function buildPlot() {
  d3.json(scrape_low_income_ca, function(ca_data) {
    // Grab values from the data json object to build the plots

    var family = []
    var county = []

    for (var i = 0; i < ca_data.length; i++) {
      family.push(ca_data[i].percent_of_families_below_the_living_wage);
      county.push(ca_data[i].county)

      };
      var trace1 = {
        type: "bar",
        x: county,
        y: family
    }
      var layout = {
        title: "Percent of Families Living Below the Living Wage in California Counties",
        yaxis: {title: "Percent (%)"}
      }
    // console.log(family)
    // console.log(race_data[0].county)
    // console.log(race_data[0].families_below_the_living_wage)
    

    Plotly.newPlot("bar", [trace1], layout);
    });
  }
  buildPlot();
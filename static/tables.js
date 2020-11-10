
var tableurl = "http://127.0.0.1:5000//low_income_ca"
var tbody = d3.select("tbody");
var h3 = d3.select("h3");

d3.json(tableurl).then(data => {
    data.forEach(function(health_data){
        var addRow = tbody.append('tr');
        Object.entries(health_data).forEach(function([x,y]){
            addRow.append('td').text(y);
        })
    });

// - Use a date form in your HTML document and write JavaScript code that will listen for events and search through the date/time column to find rows that match user input.
var button = d3.select("#filter-btn");
var form = d3.select('#form');

function buttonClicked(){
    d3.event.preventDefault();
    // Select the input element and get the raw HTML node
    var inputElement = d3.select('#healthvalue');

    // Get the value property of the input element
    var inputValue = inputElement.property("value");

    // Print the value to the console
    console.log(inputValue);
    
    var tableDataFiltered = data.filter(health => health.county == inputValue);
    console.log(tableDataFiltered);
    tbody.html("")
    
    tableDataFiltered.forEach(function(health_data){
        var addRow = tbody.append('tr')
        Object.entries(health_data).forEach(function([x,y]){
        addRow.append('td').text(y);
        })
    });
};
button.on('click', buttonClicked)
});


var tableurl = "http://127.0.0.1:5000//low_income_ca"
var tbody = d3.select("tbody");
var h3 = d3.select("h3");
// var data_pulled = undefined;

// const clone = JSON.parse(JSON.stringify(object))

d3.json(tableurl, function(h_data) {
    h_data.forEach(function(health_data){
        var addRow = tbody.append('tr');
        Object.entries(health_data).forEach(function([x,y]){
            addRow.append('td').text(y);
        })     
    });
    // console.log(data_pulled)
});
// console.log(data_pulled)

// d3.json(tableurl, function(h_data) {
//     h_data.forEach(function(health_data){
//         var addRow = tbody.append('tr');
//         Object.entries(health_data).forEach(function([x,y]){
//             addRow.append('td').text(y);
//         })
//         // data_pulled = Object.assign(h_data)
//         data_pulled = clone(h_data)       
//     });
//     // console.log(data_pulled)
// });
// console.log(data_pulled)

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

    data_pulled.forEach(function(h_data){
        var tableDataFiltered = h_data.filter(health => (health.county).tolowercase() == (inputValue).tolowercase());
        console.log(tableDataFiltered);
        tbody.html("")
    
        tableDataFiltered.forEach(function(h_data){
            var addRow = tbody.append('tr')
            Object.entries(h_data).forEach(function([x,y]){
                addRow.append('td').text(y);
            });
        });
    });
};

button.on('click', buttonClicked)


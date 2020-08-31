// from data.js
var tableData = data;
var firstFilter = true;
// console.log(tableData);

// YOUR CODE HERE!
// 
// Building unique values into array
// 
var uniqueDate = [...new Set(data.map(dt => dt.datetime))];
var uniqueCountry = [...new Set(data.map(dt => dt.country))];
var uniqueShape = [...new Set(data.map(dt => dt.shape))];

// Trying to filter based on country selection...

var uniqueState = [...new Set(data.map(dt => dt.state))];

// Trying to filter based on country and state

var uniqueCity = [...new Set(data.map(dt => dt.city))];

console.log(uniqueDate);

// 
// Part-1 --> Changing filter to dropdown options  (droppig this option)
// 

// Part-2 --> Add more Filters
// 

// Array of new filters
var filArray = ["city", "state", "country", "shape"];

// Function to capitalize a string
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Adding filters
// 
for (var i = 0; i < filArray.length; i++) {
    // Append a UL list
    var vclass = "filter list-group-item list"+i;
    var filterList = d3.select("ul").append("li");
    filterList.attr("class", vclass);
    filterList.append("label");
    filterList.append("input");

    // select list[i] child label
    var selectLabel = ".list"+i+">label"
    var labelText = "Enter "+capitalize(filArray[i]);
    // console.log(selectLabel, labelText);
    var listLabel = d3.select(selectLabel);
    listLabel.attr("for", filArray[i]);
    listLabel.text(labelText);

    // select list[i] child input
    var selectInput = ".list"+i+">input"
    var listInput = d3.select(selectInput);
    // console.log(selectInput, listInput);
    // console.log("--------");
    listInput.attr("class", "form-control");
    listInput.attr("id", "city");
    listInput.attr("type", "text");
    listInput.attr("placeholder", "");
};



// // Adding City filter
// // 
// var filterList = d3.select("ul").append("li");
// filterList.attr("class", "filter list-group-item list2");
// filterList.append("label");
// filterList.append("input");

// // select list2 child label
// var labelCity = d3.select(".list2>label");
// labelCity.attr("for", "city");
// labelCity.text("Enter City");

// // select list2 child input
// var cityInput = d3.select(".list2>input");
// cityInput.attr("class", "form-control");
// cityInput.attr("id", "city");
// cityInput.attr("type", "text");
// cityInput.attr("placeholder", "fresno");

// // Adding Country filter
// // 
// var filterList = d3.select("ul").append("li");
// filterList.attr("class", "filter list-group-item list2");
// filterList.append("label");
// filterList.append("input");

// // select list2 child label
// var labelCountry = d3.select(".list2>label");
// labelCountry.attr("for", "country");
// labelCountry.text("Enter Country");

// // select list2 child input
// var countryInput = d3.select(".list2>input");
// countryInput.attr("class", "form-control");
// countryInput.attr("id", "country");
// countryInput.attr("type", "text");
// countryInput.attr("placeholder", "us");


// End of Part-2

// Part-3 --> Deal with Filter
// 
// Select the submit button
var filterButton = d3.select("#filter-btn");

// Complete the click handler for the form
filterButton.on("click", function() {

    // Prevent the page from freshing
    d3.event.preventDefault();

    // Select the input element and get the row HTML code
    var dateElement = d3.select("#datetime");

    // Get the value property of the input element
    var dateValue = dateElement.property("value");

    console.log(dateValue);

    // Use the form input to filter the data
    var filteredData = tableData.filter(data => data.datetime === dateValue);

    console.log(filteredData);

    // Build table based on filter
    // 
    // Select the table body
    // var tbody = ""
    // var tbody = d3.select("tbody").selectAll("tr").remove().selectAll("td").remove();
    // var tbody = ""
    
    // var tbody = d3.select("tbody");
    
    if (!firstFilter) {
        console.log("Not a first try...");
        var tbody = d3.select("tbody").selectAll("tr").remove();
        // tbody.exit().remove();
    }

    var tbody = d3.select("tbody");

    // console.log(tbody);

    filteredData.forEach((marsdata) => {
        var row = tbody.append("tr");
        Object.entries(marsdata).forEach(([key, value]) => {
            var cell = row.append("td");
            console.log(key);
            cell.text(value);
        });
        firstFilter = false;
    
    });

});
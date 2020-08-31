// from data.js
var tableData = data;
var firstFilter = true;
// console.log(tableData);

// YOUR CODE HERE!
// 
// Part-1 --> Add more Filters
// 

// Array of new filters
var filArray = ["city", "state", "country", "shape"];

// Function to capitalize a string
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

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
    listInput.attr("id", filArray[i]);
    listInput.attr("type", "text");
    listInput.attr("placeholder", "");
};
// End of Part-1
// console.log("End of Part-1....");

// Display all data first.... Part-2

var tbody = d3.select("tbody");

// console.log(tbody);

tableData.forEach((marsdata) => {
    var row = tbody.append("tr");
    Object.entries(marsdata).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
    });
    firstFilter = false;
});

// Part-3 --> Deal with Filter
// 
// Select the submit button
// console.log("Start of Part-2....");
var filterButton = d3.select("#filter-btn");

// Complete the click handler for the form
filterButton.on("click", function() {

    // Prevent the page from freshing
    d3.event.preventDefault();
    // console.log("Inside on click....");

    // Select the input element and get the row HTML code
    var dateElement = d3.select("#datetime");
    var cityElement = d3.select("#city");
    var stateElement = d3.select("#state");
    var countryElement = d3.select("#country");
    var shapeElement = d3.select("#shape");

    // Get the value property of the input element
    var dateValue = dateElement.property("value");
    var cityValue = cityElement.property("value").toLowerCase();
    var stateValue = stateElement.property("value").toLowerCase();
    var countryValue = countryElement.property("value").toLowerCase();
    var shapeValue = shapeElement.property("value").toLowerCase();

    // Build filter array

    var filterValues = {datetime: dateValue, city: cityValue,
    state: stateValue, country: countryValue, shape: shapeValue};
  
    // console.log(filterValues);

    var filteredData = tableData.filter(function(item){
        for (var key in filterValues) {
            if (filterValues[key] != "") {
                // console.log(`item key: ${item[key]} and filter value key: ${filterValues[key]} `);
                if (item[key] === undefined || item[key] != filterValues[key])
                return false;
            }
        }
        return true;
    });

    // console.log("Final Filtered Data:", filteredData);
    
    if (!firstFilter) {
        console.log("Not a first try...");
        var tbody = d3.select("tbody").selectAll("tr").remove();
    }

    var tbody = d3.select("tbody");

    // console.log(tbody);

    filteredData.forEach((marsdata) => {
        var row = tbody.append("tr");
        Object.entries(marsdata).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
        firstFilter = false;
    });

});
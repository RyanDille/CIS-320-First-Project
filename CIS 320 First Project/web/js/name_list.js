// Main Javascript File
console.log("hi");

function updateTable() {

    var url = "NameListGet.java";

    $.getJSON(url, null, function(updateTable) {
            // json_result is an object. You can set a breakpoint, or print
            // it to see the fields. Specifically, it is an array of objects.
            // Here we loop the array and print the first name.
            for (var i = 0; i < updateTable.length; i++) {
                console.log(updateTable[i].email);
            }
            console.log("Done");
        }
    );

    $('#datatable tr:last').after('<tr><td>[{"id":1,"first":"Paul","last":"Craven","phone":"5159611834","email":"paul@simpson.edu","birthday":1954}]');
    $('#datatable tr:last').after('<tr><td>[{"id":2,"first":"Sam","last":"Simpson","phone":"5159611212","email":"sam@simpson.edu","birthday":1903}]');

    // Here's where your code is going to go.
}

updateTable();
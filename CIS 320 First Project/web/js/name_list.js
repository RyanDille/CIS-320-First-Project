// Main Javascript File
console.log("hi");

function updateTable() {

    var url = "api/name_list_get";
    $('#datatable tbody').html("");

    $.getJSON(url, null, function(json_result) {

        var phone = json_result[0].phone.substring(0,3) + "-" + json_result[0].phone.substring(3,6) + "-" +
            json_result[0].phone.substring(6,10);

        $('#datatable tbody').html('<tr><td>' + json_result[0].id + '</td><td>'
            + json_result[0].first + '</td><td>'
            + json_result[0].last + '</td><td>'
            + phone + '</td><td>'
            + json_result[0].email + '</td><td>'
            + json_result[0].birthday + '</td><td><button type=\'button\' name=\'delete\' class=\'deleteButton btn\' value=\''
            + json_result[0].id + '\'>Delete</button></td>'
            + '<td><button type=\'button\' name=\'edit\' class=\'editButton btn\' value=\''
            + json_result[0].id + '\'>Edit</button></td>.</tr>');


        for (var i = 1; i < json_result.length; i++) {

            var phone = json_result[i].phone.substring(0,3) + "-" + json_result[i].phone.substring(3,6) + "-" +
                json_result[i].phone.substring(6,10);

            $('#datatable tr:last').after('<tr><td>' + json_result[i].id + '</td><td>'
                + json_result[i].first + '</td><td>'
                + json_result[i].last + '</td><td>'
                + phone + '</td><td>'
                + json_result[i].email + '</td><td>' +
                + json_result[i].birthday + '</td><td><button type=\'button\' name=\'delete\' class=\'deleteButton btn\' value=\''
                + json_result[i].id + '\'>Delete</button></td>'
                + '<td><button type=\'button\' name=\'edit\' class=\'editButton btn\' value=\''
                + json_result[i].id + '\'>Edit</button></td>.</tr>');

                var buttons = $(".editButton");
                buttons.on("click", editItem);
            }
        }
    );
}

updateTable();

function editItem(e) {
    console.debug("Edit");
    console.debug(e.target.value);
    console.log("HIIII")
    var id = e.target.value;
    //var id = e.target.parentNode.parentNode.querySelectorAll("td")[0].innerHTML;
    var firstName1 = e.target.parentNode.parentNode.querySelectorAll("td")[1].innerHTML;
    var lastName1 = e.target.parentNode.parentNode.querySelectorAll("td")[2].innerHTML;
    var email1 = e.target.parentNode.parentNode.querySelectorAll("td")[4].innerHTML;
    var phone1 = e.target.parentNode.parentNode.querySelectorAll("td")[3].innerHTML;
    var birthday1 = e.target.parentNode.parentNode.querySelectorAll("td")[5].innerHTML;

    $('#id').val(id); // Yes, now we set and use the hidden ID field
    $('#firstName').val(firstName1);
    $('#lastName').val(lastName1);
    $('#email').val(email1);
    $('#phone').val(phone1);
    $('#birthday').val(birthday1);
    $('#myModal').modal('show');
}

function deleteItem(e) {

    var url = "api/name_list_delete";
    var id = e.target.value;
    console.log(id);

    $.ajax({
        type: 'POST',
        url: url,
        data: id,
        success: [function(dataFromServer) {
            console.log(dataFromServer);
            updateTable();
        }],
        contentType: "application/json",
        dataType: 'text' // Could be JSON or whatever too
    });
    console.debug("Delete");
    console.debug(e.target.value);
    console.log("Deleted Items");
}

$(document).on("click",".deleteButton", deleteItem);
console.log("Done");

// Called when "Add Item" button is clicked
function showDialogAdd() {

    // Print that we got here
    console.log("Opening add item dialog");

    $('#Identification').val("");
    $('#firstName').val("");
    $('#lastName').val("");
    $('#phone').val("");
    $('#email').val("");
    $('#birthday').val("");

    var a1 = $('#firstName');
    var a2 = $('#lastName');
    var a3 = $('#Identification');
    var a4 = $('#email');
    var a5 = $('#birthday');
    var a6 = $('#phone');

    var myArray = [a1,a2,a3, a4, a5, a6];
    myArray.forEach(function (element)
    {
        element.removeClass("is-valid");
        element.removeClass("is-invalid");
    })

    // Show the hidden dialog
    $('#myModal').modal('show');
}

function jqueryPostJSONButtonAction() {

    var url = "api/name_list_edit";
    var idField = $("#id").val();
    var firstNameField = $("#firstName").val();
    var lastNameField = $("#lastName").val();
    var emailField = $("#email").val();
    var phoneField = $("#phone").val();
    var birthdayField = $("#birthday").val();
    var dataToServer;
    console.log(idField);

    if(idField) {
        dataToServer = {
            id: idField,
            first: firstNameField,
            last: lastNameField,
            email: emailField,
            phone: phoneField,
            birthday: birthdayField
        };
    }
    else {
        dataToServer = {
            first: firstNameField,
            last: lastNameField,
            email: emailField,
            phone: phoneField,
            birthday: birthdayField
        };
    }
    //var myFieldValue = $("#jqueryPostJSONField").val();
    //var dataToServer = {firstName: myFieldValue};

    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(dataToServer),
        success: function(dataFromServer) {
            console.log(dataFromServer);
        },
        contentType: "application/json",
        dataType: 'text' // Could be JSON or whatever too
    });
}

function savingChanges() {

    var v1 = $('#firstName').val();
    var v2 = $('#lastName').val();
    var v3 = $('#id').val();
    var v4 = $('#email').val();
    var v5 = $('#birthday').val();
    var v6 = $('#phone').val();

    // Create the regular expression
    var reg = /^[a-zA-Z]+$/;
    var reg1 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    var reg2 = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var date = /^\d{4}-\d{2}-\d{2}$/;
    // Test the regular expression to see if there is a match

    var isValid = true;

    if (reg.test(v1)) {
        $('#firstName').addClass("is-valid");
        $('#firstName').removeClass("is-invalid");
    } else {
        isValid = false;
        $('#firstName').removeClass("is-valid");
        $('#firstName').addClass("is-invalid");
    }

    if (reg.test(v2)) {
        $('#lastName').addClass("is-valid");
        $('#lastName').removeClass("is-invalid");
    } else {
        isValid = false;
        $('#lastName').removeClass("is-valid");
        $('#lastName').addClass("is-invalid");
    }

    if (reg2.test(v4)) {
        $('#email').addClass("is-valid");
        $('#email').removeClass("is-invalid");
    } else {
        isValid = false;
        $('#email').removeClass("is-valid");
        $('#email').addClass("is-invalid");
    }

    if (date.test(v5)) {
        $('#birthday').addClass("is-valid");
        $('#birthday').removeClass("is-invalid");
    } else {
        isValid = false;
        $('#birthday').removeClass("is-valid");
        $('#birthday').addClass("is-invalid");
    }

    if (reg1.test(v6)) {
        $('#phone').addClass("is-valid");
        $('#phone').removeClass("is-invalid");
    } else {
        isValid = false;
        $('#phone').removeClass("is-valid");
        $('#phone').addClass("is-invalid");
    }

    if(isValid == true)
    {
        var url = "api/name_list_edit";
        if(v3) {
            dataToServer = {
                id: v3,
                first: v1,
                last: v2,
                email: v4,
                phone: v6,
                birthday: v5
            };
        }
        else {
            dataToServer = {
                first: v1,
                last: v2,
                email: v4,
                phone: v6,
                birthday: v5
            };
        }

        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(dataToServer),
            success: function(dataFromServer) {
                console.log(dataFromServer);
                updateTable();
            },
            contentType: "application/json",
            dataType: 'text' // Could be JSON or whatever too
        });

        console.log("Your items have been added");
    } else {
        console.log("Invalid");
    }

}

var addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

var saveChangesButton = $('#saveChanges');
saveChangesButton.on("click", savingChanges);

var buttons = $(".deleteButton");
buttons.on("click", deleteItem);

var jqueryPostJSONButton = $('#jqueryPostJSONButton');
jqueryPostJSONButton.on("click", jqueryPostJSONButtonAction);





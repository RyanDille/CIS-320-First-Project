// Attach an the function to a button click that prints out hello to the console
function hello(event)
{
    console.log("Hello")
}

var formButton1 = $('#button1');
formButton1.on("click", hello);

function addFunction(event)
{
    var y = $('#field1').val();
    var z = $('#field2').val();
    var x = Number(y) + Number(z);
    console.log(x);
    document.getElementById("field3").value = x;
}

    var formButton2 = $('#button2');
    formButton2.on("click", addFunction);

// -- How to hide an item based on a button click

// Create a function to hide an item
    function hideFunction(event) {
        if ($("#paragraphToHide").is(":visible")) {
            $("#paragraphToHide").hide(500);
        }
        else
            {
                $("#paragraphToHide").show(500);
            }

    }

// Attach an action to a button click
    var formButton3 = $('#button3');
    formButton3.on("click", hideFunction);


// Function to validate
    function validateFunction(event) {
        // Get the field
        var v1 = $('#phoneField').val();

        // Create the regular expression
        var reg = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;

        // Test the regular expression to see if there is a match
        if (reg.test(v1)) {
            $('#result'), console.log("Ok");
        } else {
            $('#result'), console.log("Bad");
        }
    }

// Attach an action to a button click
    var formButton4 = $('#button4');
    formButton4.on("click", validateFunction);


// Create a function to add a row to the table
    function myUpdateFunction(event) {

        var fieldValue = $('#firstName').val();
        var fieldValue2 = $('#lastName').val();
        var fieldValue3 = $('#email').val();
        console.log("{firstName " + ": " + fieldValue + " , " + "lastName " +
            "" + ": " + fieldValue2 + " , " + "email " + ": " + fieldValue3 + "}");
    }

// Attach an the function to a button click
    var formButton5 = $('#button5');
    formButton5.on("click", myUpdateFunction);










"use strict";
// Goal
// Object Literal Version No Library
// #1 create an Object to support PaintTin
// must hit enclosure first to start the process then purchase
var code = "0000";
var cost = 150.00
var colour = "WHITE";
var topSecretVar ="";
$(document).ready(() => {

    $("#enclosure_id").click(event => {
        topSecretVar = generateSecretVar();
        topSecretVar.setSecret("6789"); // Set the secret number
        //console.log("Secret Number after setting:", topSecretVar.getSecret());
        var temp = topSecretVar.getSecret(); // Get the secret number
        console.debug(temp); // Outputs: 6789
    });

    $("#purchase_id").click(event => {
        var temp = topSecretVar.getSecret();
        console.debug(temp);

        try {
            var paintCode = $("#paint_code_id");
            paintCode = validatePaintCode(paintCode);
            var selectedColour = readRadioButton();
            processPurchase(paintCode, selectedColour);
            $("#paint_code_id").next().text("");
        }
        catch (error) {
            $("#paint_code_id").next().text(error.message);
            $("#message_id").text("Purchase Cancelled !!! Try Again!!!");
}
    });
});

const generateSecretVar = () => {
    let secretNumber = "0000"; // outer function

    const setSecret = (secret) => {
        secretNumber = secret; // inner function accessing outer variable
    }
    const getSecret = () => {
        return secretNumber; // inner function accessing outer variable
    }
     return {
        setSecret, getSecret // returning an object that contains these inner functions
     };

};

const processPurchase = (paintCode, colourSelected) => {
    code = paintCode;
    colour = colourSelected;
    cost++;
    var sellingPrice = cost * 2;
    const message = `Purchase:
Code: ${code}
Colour: ${colour}
Selling Price: ${sellingPrice}`;
    $("#message_id").text(message);

    if (colourSelected == "Red")
        topSecretVar.setSecret(`${sellingPrice}`);
    if (colourSelected == "Blue")
        $("#message2_id").text(topSecretVar.getSecret());

    console.log( "Line 67: " + topSecretVar.getSecret() );

}
const readRadioButton = () => {
    const selRadioBtnVal = $(":radio:checked").val();
    return selRadioBtnVal;
}
const validatePaintCode = (testCode) => {
    const itemCodePattern = /^[0-9]{4}$/;
    var testString = testCode.val().trim(); // has to be var !!
    if (testString == "") {
        throw new Error("This field is required");
    } else if (!itemCodePattern.test(testString)) {
        throw new Error("Must be exactly 4 Numbers");
    } else {
        return testString;
    }
}
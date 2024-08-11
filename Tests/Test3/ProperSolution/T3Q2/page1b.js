"use strict";
var income_val;
var taxesPaid_val;

$(document).ready(() => {
    console.debug("Document is Open");
    $("#submit").click(event => { // (1) Button Problem
        event.preventDefault(); // Add this line to prevent form submission (just added preventDefault)
        const income = $("#income_id");
        try {
            income_val = testInput(income);
            income.next().text("*");
        } catch (error) {
            income.next().text(error.message);
        }

        const taxesPaid = $("#taxes_paid_id");
        try {
            taxesPaid_val = testInput(taxesPaid);
            taxesPaid.next().text("*");
        } catch (error) {
            taxesPaid.next().text(error.message);
        }
        calculateTax();
    });
});

const testInput = (testInput) => {
    var testNumber = testInput.val().trim();
    // blank test
    if (testNumber == "") {
        throw new Error("This field is required"); // (2) Problem with Blank Messages (always need message in error, just added one)
    }
    // Valid Number Test
    var testNumberFloat = parseFloat(testNumber);
    if (isNaN(testNumberFloat)) {
        throw new Error("Input must be a number");
    }
    // Range Test
    if (testNumberFloat < 0.0 || testNumberFloat > 900000.0) {
        throw new Error("Input must be in range 0.00 to 900,000.00");
    }
    // If you reached this point there are NO errors
    return testNumberFloat;
}

const calculateTax = () => {
    const taxStatus = $("#status_id");
    var taxAmount = income_val / 2; // (3) Problem with Tax Calculations*** (added actual calculation instead of just income_val)
    var creditAmount = taxesPaid_val;
    if (!isNaN(taxAmount) && !isNaN(creditAmount)) {
        var taxesOwing = taxAmount - creditAmount;
        if (taxesOwing > 0.0)
            taxStatus.val(`Taxes Owing: ${taxesOwing}`);
        else {
            var refund = taxesOwing * -1;
            taxStatus.val(`Refund: ${refund}`);
        }
    } else
        taxStatus.val(``);
}
